
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
 DROP TABLE dbo.Users;
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    -- primary key column
    name nvarchar(50) NOT NULL,
);
GO


-- Drop the table if it already exists
IF OBJECT_ID('dbo.Enrolments', 'U') IS NOT NULL
 DROP TABLE dbo.Enrolments;
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Enrolments
(
    id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    user_id INT NOT NULL,
    program_id INT NOT NULL,
    CONSTRAINT fk_user_id 
        FOREIGN KEY (user_id)
        REFERENCES dbo.Users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_program_id 
        FOREIGN KEY (program_id)
        REFERENCES dbo.Programs(id)
        ON DELETE CASCADE
);
GO