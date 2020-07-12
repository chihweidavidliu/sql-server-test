#!/usr/bin/env bash
# Wait for database to startup 
sleep 20
./opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 23--HFEWF-f23f32wg8w3hg38gh3g3g3g3 -i setup.sql