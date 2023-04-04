
install:
	cd ./express-server && make install
	cd ./react-app && make install

run-express:
	cd ./express-server && make run

run-react:
	cd ./react-app && make run

docker-express:
	cd ./express-server && make docker

docker-react:
	cd ./react-app && make docker

clean:
	cd ./express-server && make clean
	cd ./react-app && make clean