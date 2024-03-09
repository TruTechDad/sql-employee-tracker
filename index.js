const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║     _____                 _                                      ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___                ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\               ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/               ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|               ║
║                    |_|            |___/                          ║
║                                                                  ║
║     __  __                                                       ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __                     ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__                     ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |                       ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                       ║
║                              |___/                               ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
`);

const db = mysql.createConnection({
    database: 'employee_tracker_db',
    user: 'root',
    host: '127.0.0.1',
});

const prompt = inquirer.createPromptModule();

const start = () => {
    prompt({
        message: 'Choose an option',
        type: 'list',
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
    }).then((answer) => {
        console.log(answer.view);
        switch (answer.view) {
            case 'View All Employees':
                showEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Employees by Manager':
                showEmployeesByManager();
                break;
            case 'View All Roles':
                showAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                showAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            // case 'Delete Department':
            //     deleteDepartment();
            //     break;
                    
            case 'Exit':
                console.log('Exiting...');
                db.end(); // Use db.end() to close the database connection
                break;
                
            // default:
            //     console.log('Invalid option');
            //     start();
            //     break;
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
    
    db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            promptUser();
        })
        .catch((err) => {
            console.error("Error fetching employees:", err);
            promptUser();
        });
};

// const showRoles = () => {
//     // SQL query to fetch all roles
//     const sql = `SELECT role.id, role.title, department.name AS department
//                  FROM role
//                  INNER JOIN department ON role.department_id = department.id`;

//     db.promise().query(sql)
//         .then(([rows, fields]) => {
//             console.table(rows);
//             // promptUser();
//         })
//         .catch((err) => {
//             console.error("Error fetching roles:", err);
//             // promptUser();
//         });
// };

const addEmployee = () => {
    console.log('Add Employee');
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter employee's first name:"
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter employee's last name:"
            },
            {
                name: "role_id",
                type: "number",
                message: "Enter employee's role ID:"
            },
            {
                name: "manager_id",
                type: "number",
                message: "Enter employee's manager ID:"
            }
        ])
        .then((answers) => {
            // Implement logic to add the employee to the database
            console.log("Employee added successfully!");
            promptUser();
        })
        .catch((error) => {
            console.error("Error adding employee:", error);
            promptUser();
        });
};

const showEmployeesByManager = () => {
    console.log('View Employees by Manager');
    inquirer
        .prompt([
            {
                name: "manager_id",
                type: "number",
                message: "Enter manager's ID to view employees:"
            }
        ])
        .then((answers) => {
            // Implement logic to fetch employees by manager ID from the database
            console.log(`Viewing employees for manager with ID ${answers.manager_id}`);
            promptUser();
        })
        .catch((error) => {
            console.error("Error viewing employees by manager:", error);
            promptUser();
        });
};
const showAllRoles = () => {
    console.log('View All Roles');
    const sql = 'SELECT * FROM roles'; 

    // Execute the query
    db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows); 
            promptUser(); 
        })
        .catch((error) => {
            console.error("Error fetching roles:", error);
            promptUser();
        });
};


const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter role title:'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter role salary:'
            },
            {
                name: 'department_id',
                type: 'number',
                message: 'Enter department ID:'
            }
        ])
        .then((answers) => {
            const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
            db.query(sql, [answers.title, answers.salary, answers.department_id], (error, result) => {
                if (error) {
                    console.error("Error adding role:", error);
                } else {
                    console.log("Role added successfully!");
                }
                promptUser();
            });
        })
        .catch((error) => {
            console.error("Error adding role:", error);
            promptUser();
        });
};
const showAllDepartments = () => {
    console.log('View All Departments');
    const sql = 'SELECT * FROM departments'; 

    // Execute the query
    db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows); 
            promptUser(); 
        })
        .catch((error) => {
            console.error("Error fetching departments:", error);
            promptUser();
        });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter department name:'
            }
        ])
        .then((answer) => {
            const sql = 'INSERT INTO departments (name) VALUES (?)';
            db.query(sql, [answer.name], (error, result) => {
                if (error) {
                    console.error("Error adding department:", error);
                } else {
                    console.log("Department added successfully!");
                }
                promptUser();
            });
        })
        .catch((error) => {
            console.error("Error adding department:", error);
            promptUser();
        });
};

// const deleteDepartment = () => {
//     console.log("Starting deleteDepartment function...");
//     inquirer
//         .prompt([
//             {
//                 name: 'department_id',
//                 type: 'number',
//                 message: 'Enter the ID of the department you want to delete:'
//             }
//         ])
//         .then((answers) => {
//             console.log("User entered department ID:", answers.department_id);
//             const sql = 'DELETE FROM departments WHERE id = ?';
//             db.query(sql, [answers.department_id], (error, result) => {
//                 if (error) {
//                     console.error("Error deleting department:", error);
//                 } else {
//                     console.log("Department deleted successfully!");
//                 }
//                 promptUser();
//             });
//         })
//         .catch((error) => {
//             console.error("Error deleting department:", error);
//             promptUser();
//         });
// };



const promptUser = () => {
    start();
};

start();
