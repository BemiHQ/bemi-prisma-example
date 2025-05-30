init:
	devbox install && \
	devbox run initdb && \
		sed -i "s/#port = 5432/port = 5434/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#log_statement = 'none'/log_statement = 'all'/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#logging_collector = off/logging_collector = on/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#log_directory = 'log'/log_directory = 'log'/g" ./.devbox/virtenv/postgresql/data/postgresql.conf

create:
	devbox run "createdb -p 5434 bemi_dev_source && \
		createuser -p 5434 --superuser --replication postgres && \
		psql -p 5434 -U postgres -c \"ALTER SYSTEM SET wal_level = logical;\"" && \
		make pg-down pg-up

delete:
	devbox run "dropdb -p 5434 bemi_dev_source && dropuser -p 5434 postgres"

install:
	devbox run --env-file ./server/.env "bun install && \
		cd server && \
		  bun install && \
			bun prisma generate && \
			bun prisma generate --schema prisma/bemi.prisma && \
		cd ../client && bun install"

up: install
	devbox run "bun run concurrently \"make up-server\" \"make up-client\""

up-next: install
	devbox run --env-file ./server/.env "cd server && bun next dev ./next-app -p 4003"

up-server:
	devbox run --env-file ./server/.env "cd server && bun --inspect src/index.ts"

up-client:
	devbox run "cd client && PORT=4002 bun run react-scripts start"

pg-up:
	devbox services start postgresql-source

pg-down:
	devbox services stop

pg-logs:
	tail -f .devbox/virtenv/postgresql/data/log/postgresql-*.log

psql:
	devbox run psql bemi_dev_source -p 5434

ps:
	@devbox services ls

sh:
	devbox --env-file ./server/.env shell

migrate:
	devbox run --env-file ./server/.env "cd server && bunx prisma migrate dev"

reset:
	devbox run --env-file ./server/.env "cd server && bunx prisma migrate reset"
