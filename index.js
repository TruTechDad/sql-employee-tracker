const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection({
    database: 'employee_db',
    user: 'root',
    host: '127.0.0.1',
});

const prompt = inquirer.createPromptModule();

const start = () => {
    prompt({
        message: 'Choose an option',
        type: 'rawlist',
        name: 'view',
        choices: [
            'View All Employees',
            'Add Employee',
            'View Employees by Manager',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit'
        ]
    }).then((answers) => {
        switch (answers.view) {
            case 'View All Employees':
                db.query('SELECT * FROM employee', (error, employees) => {
                    if (error) console.error(error);
                    console.table(employees);
                    start();
                });
                break;

                case 'Add Role':
                    console.log("Adding a new role...");
                    addRole();
                    break;

            // Add cases for other options

            case 'Exit':
                console.log("Exiting application...");
                db.end();
                console.log('Goodbye!');
                break;
        }
    });
};

const addRole = () => {
    console.log("Prompting user to add a new role...");
    inquirer
        .prompt([
            {
                name: "role_title",
                type: "input",
                message: "Role title?"
            },
            {
                name: "role_salary",
                type: "number",
                message: "Role salary?"
            },
            {
                name: "role_department",
                type: "input",
                message: "Which department is it in?"
            }
        ])
        .then((response) => {
            // Retrieve department ID based on the department name provided by the user
            db.query('SELECT id FROM department WHERE name = ?', [response.role_department], (error, departmentResults) => {
                if (error) {
                    console.error("Error retrieving department ID:", error);
                    start();
                } else {
                    const departmentId = departmentResults[0]?.id;
                    if (!departmentId) {
                        console.error("Department not found.");
                        start();
                        return;
                    }

                    // Insert the new role into the database
                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.role_title, response.role_salary, departmentId], (error, results) => {
                        if (error) {
                            console.error("Error adding role:", error);
                        } else {
                            console.log("Role added successfully.");
                        }
                        start();
                    });
                }
            });
        });
};

start();
