
all: install run

install:
	npm install

run:
	npm start

docker:
	docker build . -t react-app

clean:
	docker image rm react-app
	rm -rf node_modules || true
	rm package-lock.json || true