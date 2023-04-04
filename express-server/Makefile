
all: install run

install:
	npm install

run:
	npm start

docker:
	docker build . -t express-server

clean:
	docker image rm express-server
	rm -rf node_modules || true
	rm package-lock.json || true