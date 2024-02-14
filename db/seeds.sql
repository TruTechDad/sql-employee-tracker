USE employee_tracker_db;

-- Departments 
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Operations');
INSERT INTO departments (name) VALUES ('Security');
INSERT INTO departments (name) VALUES ('Technology');
INSERT INTO departments (name) VALUES ('Executive');
INSERT INTO departments (name) VALUES ('Legal');
INSERT INTO departments (name) VALUES ('R&D');
INSERT INTO departments (name) VALUES ('Crisis Management');
INSERT INTO departments (name) VALUES ('International Relations');
INSERT INTO departments (name) VALUES ('Community Outreach');

-- Roles 
INSERT INTO roles (title, salary, department_id) VALUES ('CEO and President', 200000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Operations', 150000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Security Consultant', 120000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Technology Analyst', 100000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Junior Executive', 80000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Cybersecurity Specialist', 110000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Martial Arts Trainer', 100000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Project Coordinator', 90000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Executive Assistant', 95000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Legal Counsel', 130000, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('R&D Engineer', 110000, 7);
INSERT INTO roles (title, salary, department_id) VALUES ('Crisis Management Consultant', 140000, 8);
INSERT INTO roles (title, salary, department_id) VALUES ('International Relations Liaison', 120000, 9);
INSERT INTO roles (title, salary, department_id) VALUES ('Community Outreach Coordinator', 90000, 10);

-- Employees data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bruce', 'Wayne', 1, NULL); -- CEO and President
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Dick', 'Grayson', 2, 1); -- Head of Operations
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jason', 'Todd', 3, 1); -- Security Consultant
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Tim', 'Drake', 4, 1); -- Technology Analyst
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Damian', 'Wayne', 5, 1); -- Junior Executive
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Barbara', 'Gordon', 6, 1); -- Cybersecurity Specialist
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Cassandra', 'Cain', 7, 1); -- Martial Arts Trainer
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Stephanie', 'Brown', 8, 1); -- Project Coordinator
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alfred', 'Pennyworth', 9, 1); -- Executive Assistant
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kate', 'Kane', 10, 1); -- Legal Counsel
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Luke', 'Fox', 11, 1); -- R&D Engineer
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jean-Paul', 'Valley', 12, 1); -- Crisis Management Consultant
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Helena', 'Bertinelli', 13, 1); -- International Relations Liaison
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Duke', 'Thomas', 14, 1); -- Community Outreach Coordinator
