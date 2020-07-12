FROM mcr.microsoft.com/mssql/server:2019-latest


# Create a config directory
RUN mkdir -p /usr/config
WORKDIR /usr/config

COPY setup.sql /usr/config/setup.sql
COPY configure-db.sh /usr/config/configure-db.sh
COPY entrypoint.sh /usr/config/entrypoint.sh

# Grant permissions for to our scripts to be executable
RUN chmod +x /usr/config/entrypoint.sh
RUN chmod +x /usr/config/configure-db.sh

ENTRYPOINT ["./entrypoint.sh"]