up:
		docker-compose up -d
work:
		docker-compose exec php bash
build:
		docker-compose build
create-project:
		docker-compose up -d --build
		docker-compose exec php composer create-project --prefer-dist laravel/laravel .
		docker-compose exec php composer require predis/predis
install:
		docker-compose up -d --build
		docker-compose exec php composer install
		docker-compose exec php cp .env.example .env
		docker-compose exec php php artisan key:generate
		docker-compose exec php php artisan migrate:fresh --seed
reinstall:
		@make destroy
		@make install
stop:
		docker-compose stop
restart:
		docker-compose down
		docker-compose up -d
down:
		docker-compose down
destroy:
		docker-compose down --rmi all --volumes
ps:
		docker-compose ps
app:
		docker-compose exec php bash
fresh:
		docker-compose exec php php artisan migrate:fresh --seed
seed:
		docker-compose exec php php artisan db:seed
tinker:
		docker-compose exec php php artisan tinker
dump:
		docker-compose exec php php artisan dump-server
test:
		docker-compose exec php php ./vendor/bin/phpunit
cache:
		docker-compose exec php composer dump-autoload -o
		docker-compose exec php php artisan optimize:clear
		docker-compose exec php php artisan optimize
cache-clear:
		docker-compose exec php php artisan optimize:clear
cs:
		docker-compose exec php ./vendor/bin/phpcs
cbf:
		docker-compose exec php ./vendor/bin/phpcbf
db:
		docker-compose exec db bash
sql:
		docker-compose exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
node:
		docker-compose exec node ash
npm:
		docker-compose exec node npm install
		docker-compose exec node npm run dev
yarn:
		docker-compose exec node yarn
		docker-compose exec node yarn dev