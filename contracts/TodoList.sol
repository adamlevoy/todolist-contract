//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TodoList {
    struct Todo {
        uint256 id;
        string text;
        bool completed;
    }

    Todo[] public todos;
    mapping(address => Todo[]) todosByOwner;

    event AddedTodo(
        address indexed owner,
        uint256 indexed id,
        string indexed text
    );
    event ToggledTodo(
        address indexed owner,
        uint256 indexed id,
        string indexed text
    );

    event RemovedTodo(
        address indexed owner,
        uint256 indexed id,
        string indexed text
    );

    modifier todoExists(uint256 _id) {
        Todo[] storage todoList = todosByOwner[msg.sender];
        bool validTodo;
        for (uint256 i = 0; i < todoList.length; i++) {
            if (_id == todoList[i].id) {
                validTodo = true;
            }
        }
        require(validTodo, "Todo does not exist!");
        _;
    }

    function addTodo(string calldata _text) external {
        Todo[] storage todoList = todosByOwner[msg.sender];
        uint256 todoId = todoList.length + 1;
        todoList.push(Todo({id: todoId, text: _text, completed: false}));
        emit AddedTodo(msg.sender, todoId, _text);
        console.log(
            "You created Todo with ID: %d, and text: %s",
            todoId,
            _text
        );
    }

    function toggleCompleted(uint256 _id) external {
        require(_id <= todosByOwner[msg.sender].length, "Todo does not exist!");
        Todo storage todo = todosByOwner[msg.sender][_id - 1];
        todo.completed = !todo.completed;
        emit ToggledTodo(msg.sender, todo.id, todo.text);
        console.log("You toggled Todo #%d: %s", todo.id, todo.text);
    }

    function removeTodo(uint256 _id) external todoExists(_id) {
        Todo[] storage todoList = todosByOwner[msg.sender];
        string memory todoText;

        for (uint256 i = 0; i < todoList.length; i++) {
            if (_id == todoList[i].id) {
                todoList[i] = todoList[todoList.length - 1];
                todoText = todoList[i].text;
                console.log("Todo #%d has been removed!", _id);
            }
        }

        todoList.pop();
        emit RemovedTodo(msg.sender, _id, todoText);
    }

    function getTodoListByOwner() external view returns (Todo[] memory) {
        Todo[] storage todoList = todosByOwner[msg.sender];
        require(todoList.length > 0, "No todos!");

        console.log("Here is your Todo List:");
        for (uint256 i = 0; i < todoList.length; i++) {
            console.log("Todo #%d:", todoList[i].id, todoList[i].text);
        }

        return todoList;
    }
}
