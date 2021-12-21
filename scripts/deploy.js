async function main() {
  // get the contract to deploy
  const todoListContractFactory = await hre.ethers.getContractFactory("TodoList");
  const todoListContract = await todoListContractFactory.deploy();
  await todoListContract.deployed();
  console.log("Contract deployed to:", todoListContract.address);

  // create todo #1
  let txAddTodo = await todoListContract.addTodo("write smart contract");
  console.log("Adding todo...⛏️");
  await txAddTodo.wait();
  console.log("Todo added! ✅");

  // create todo #2
  txAddTodo = await todoListContract.addTodo("deploy smart contract");
  console.log("Adding todo...⛏️");
  await txAddTodo.wait();
  console.log("Todo added! ✅");

  // create todo #3
  txAddTodo = await todoListContract.addTodo("build front end");
  console.log("Adding todo...⛏️");
  await txAddTodo.wait();
  console.log("Todo added! ✅");

  // show todo list
  txGetTodos = await todoListContract.getTodoListByOwner();
  console.log("Here are your todos:", txGetTodos);

  // toggle todo #1
  // let txToggleTodo = await todoListContract.toggleCompleted(1);
  // console.log("Updating todo...⛏️");
  // await txToggleTodo.wait();
  // console.log("Todo updated! ✅");

  // // toggle todo #2
  // txToggleTodo = await todoListContract.toggleCompleted(2);
  // console.log("Updating todo...⛏️");
  // await txToggleTodo.wait();
  // console.log("Todo updated! ✅");

  // // show todo list
  // txGetTodos = await todoListContract.getTodoListByOwner();
  // console.log("Here are your todos:", txGetTodos);

  //remove todo
  // let txRemoveTodo = await todoListContract.removeTodo(2);
  // console.log("Removing todo...");
  // await txRemoveTodo.wait();
  // console.log("Todo removed! ❌");

  // // show todo list
  // txGetTodos = await todoListContract.getTodoListByOwner();
  // console.log("Here are your todos:", txGetTodos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
