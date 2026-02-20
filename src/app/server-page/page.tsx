const throwErrorExample = async () => {
  const randomNumber = Math.floor(Math.random() * 100);

  if (randomNumber % 2 === 0) {
    throw new Error("Server Runtime Error");
  }
  
  return "Sucesso";
};

const promiseErrorExample = async () =>
  new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 2 === 0) {
      reject(new Error("Server Runtime Error"));
    }
    resolve("Sucesso");
  });

export default async function ServerPage() {
  await throwErrorExample();
  await promiseErrorExample();

  return <h1>sucesso</h1>;
}
