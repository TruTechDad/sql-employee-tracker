USE employee_tracker_db;

-- Departments 
INSERT INTO departments(department_name) 
VALUES ('Engineering'),
        ('Operations'),
        ('Security'),
        ('Technology'),
        ('Executive'),
        ('Legal'),
        ('R&D'),
        ('Crisis Management'),
        ('International Relations'),
        ('Community Outreach');

-- Roles 
INSERT INTO roles(title, salary, department_id) 
VALUES ('CEO and President', 200000, 5),
        ('Head of Operations', 150000, 2),
        ('Security Consultant', 120000, 3),
        ('Technology Analyst', 100000, 4),
         ('Junior Executive', 80000, 5),
        ('Cybersecurity Specialist', 110000, 3),
        ('Martial Arts Trainer', 100000, 3),
        ('Project Coordinator', 90000, 2),
        ('Executive Assistant', 95000, 5),
        ('Legal Counsel', 130000, 6),
        ('R&D Engineer', 110000, 7),
        ('Crisis Management Consultant', 140000, 8),
        ('International Relations Liaison', 120000, 9),
        ('Community Outreach Coordinator', 90000, 10);

-- Employees data
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Bruce', 'Wayne', 1, NULL), 
       ('Dick', 'Grayson', 2, 1),
       ('Jason', 'Todd', 3, 1),
        ('Tim', 'Drake', 4, 1),
       ('Damian', 'Wayne', 5, 1),
        ('Barbara', 'Gordon', 6, 1),
       ('Stephanie', 'Brown', 8, 1), 
       ('Alfred', 'Pennyworth', 9, 1), 
       ('Kate', 'Kane', 10, 1),
       ('Luke', 'Fox', 11, 1),
       ('Jean-Paul', 'Valley', 12, 1), 
       ('Helena', 'Bertinelli', 13, 1),
       ('Duke', 'Thomas', 14, 1); 
