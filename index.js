// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// require('console.table');

// const db = mysql.createConnection({
//     database: 'employee_tracker_db',
//     user: 'root',
//     host: '127.0.0.1',
// });

// const prompt = inquirer.createPromptModule();

// const start = () => {
//     prompt({
//         message: 'Choose an option',
//         type: 'list',
//         name: 'view',
//         choices: [
//             'View All Employees',
//             'Add Employee',
//             'View Employees by Manager',
//             'View All Roles',
//             'Add Role',
//             'View All Departments',
//             'Add Department',
//             'Exit'
//         ]
//     }).then((answer) => {
//     console.log(answer.option) {
//         case 'View All Employees':
//             showEmployees();
//             break;
//         case 'Add Employee':
//             addEmployee();
//             break;
//         case 'View Employees by Manager':
//             viewEmployeesByManager();
//             break;
//         case 'View All Roles':
//             showRoles();
//             break;
//         case 'Add Role':
//             addRole();
//             break;
//         case 'View All Departments':
//             showDepartments();
//             break;
//         case 'Add Department':
//             addDepartment();
//             break;
//         case 'Exit':
//             console.log('Exiting...');
//             connection.end();
//             break;
//     }
// });
// };

// const showEmployees = () => {
//     const sql = `SELECT employee.id, 
//                         employee.first_name, 
//                         employee.last_name, 
//                         role.title, 
//                         department.name AS department, 
//                         role.salary,
//                         CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//                  FROM employee
//                  INNER JOIN role ON employee.role_id = role.id
//                  INNER JOIN department ON role.department_id = department.id
//                  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
    
//     connection.promise().query(sql)
//         .then(([rows, fields]) => {
//             console.table(rows);
//             promptUser();
//         })
//         .catch((err) => {
//             console.error("Error fetching employees:", err);
//             promptUser();
//         });
// };

// const showRoles = () => {
//     // SQL query to fetch all roles
//     const sql = `SELECT role.id, role.title, department.name AS department
//                  FROM role
//                  INNER JOIN department ON role.department_id = department.id`;

//     connection.promise().query(sql)
//         .then(([rows, fields]) => {
//             console.table(rows);
//             promptUser();
//         })
//         .catch((err) => {
//             console.error("Error fetching roles:", err);
//             promptUser();
//         });
// };

// const addEmployee = () => {
//     console.log('Implement logic to add an employee');
//     promptUser();
// };

// const viewEmployeesByManager = () => {
//     console.log('Implement logic to view employees by manager');
//     promptUser();
// };


// const addRole = () => {
//     console.log("Prompting user to add a new role...");
//     inquirer
//         .prompt([
//             {
//                 name: "role_title",
//                 type: "input",
//                 message: "Role title?"
//             },
//             {
//                 name: "role_salary",
//                 type: "number",
//                 message: "Role salary?"
//             },
//             {
//                 name: "role_department",
//                 type: "input",
//                 message: "Which department is it in?"
//             }
//         ])
//         .then((response) => {
//             // Retrieve department ID based on the department name provided by the user
//             db.query('SELECT id FROM department WHERE name = ?', [response.role_department], (error, departmentResults) => {
//                 if (error) {
//                     console.error("Error retrieving department ID:", error);
//                     start();
//                 } else {
//                     const departmentId = departmentResults[0]?.id;
//                     if (!departmentId) {
//                         console.error("Department not found.");
//                         start();
//                         return;
//                     }

//                     // Insert the new role into the database
//                     db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.role_title, response.role_salary, departmentId], (error, results) => {
//                         if (error) {
//                             console.error("Error adding role:", error);
//                         } else {
//                             console.log("Role added successfully.");
//                         }
//                         start();
//                     });
//                 }
//             });
//         });
// };

// start();

const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    database: 'employee_db',
    user: 'root',
    host: '127.0.0.1',
});

const prompt = inquirer.createPromptModule();

const start = () => {
    inquirer.prompt({
        message: 'Choose an option',
        type: 'list',
        name: 'option',
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
    }).then((answer) => {
        console.log(answer.option);
        switch (answer.option) {
            case 'View All Employees':
                showEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Employees by Manager':
                viewEmployeesByManager();
                break;
            case 'View All Roles':
                showRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                showDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Exit':
                console.log('Exiting...');
                connection.end();
                break;
            default:
                console.log('Invalid option');
                start();
                break;
        }
    });
};

const showEmployees = () => {
    const sql = `SELECT employees.id, 
                        employees.first_name, 
                        employees.last_name, 
                        roles.title, 
                        departments.department_name AS department, 
                        roles.salary,
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                 FROM employees
                 INNER JOIN roles ON employees.role_id = roles.id
                 INNER JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees AS manager ON employees.manager_id = manager.id`;
    
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            start();
        })
        .catch((err) => {
            console.error("Error fetching employees:", err);
            start();
        });
};


const showRoles = () => {
    const sql = `SELECT roles.id, roles.title, departments.department_name AS department
                 FROM roles
                 INNER JOIN departments ON roles.department_id = departments.id`;

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            start();
        })
        .catch((err) => {
            console.error("Error fetching roles:", err);
            start();
        });
};

const addEmployee = () => {
    console.log('Implement logic to add an employee');
    start();
};

const viewEmployeesByManager = () => {
    console.log('Implement logic to view employees by manager');
    start();
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
            connection.query('SELECT id FROM departments WHERE department_name = ?', [response.role_department], (error, departmentResults) => {
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
                    connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [response.role_title, response.role_salary, departmentId], (error, results) => {
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

const showDepartments = () => {
    const sql = `SELECT id, department_name AS department FROM departments`;

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            start();
        })
        .catch((err) => {
            console.error("Error fetching departments:", err);
            start();
        });
};

const addDepartment = () => {
    console.log("Prompting user to add a new department...");
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "Department name?"
            }
        ])
        .then((response) => {
            // Insert the new department into the database
            connection.query('INSERT INTO departments (department_name) VALUES (?)', [response.department_name], (error, results) => {
                if (error) {
                    console.error("Error adding department:", error);
                } else {
                    console.log("Department added successfully.");
                }
                start();
            });
        });
};

start();
