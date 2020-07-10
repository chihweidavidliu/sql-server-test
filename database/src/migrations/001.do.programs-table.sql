-- Create a new table called 'Customers' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Programs', 'U') IS NOT NULL
 DROP TABLE dbo.Programs;
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Programs
(
 id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, -- primary key column
 name nvarchar(50) NOT NULL,
 current_price INT NOT NULL,
 commodity nvarchar(50) NOT NULL
);
GO