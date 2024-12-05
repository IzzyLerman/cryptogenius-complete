# Cryptogenius

Cryptogenius is a desktop cryptocurrency trading simulator. It utilizes the following microservices, each of which must run in its own process:
* Notification service
* Coin lookup service
* Logo service
* Coin summary service

On windows machines, you can launch all the services at once by running `.\launch.bat` from the root directory.

# Configuring the Program Environment

Create a `.env` file in the root directory to store the environment variables. Follow the syntax of the `.env.example` file to do so. Choose ports for each of the microservices to run locally on. Then, you'll need to add your CoinMarketCap API key. A free membership will be sufficient to use the program. You can sign up for an account [here](https://coinmarketcap.com/api/pricing/).

# Running the Program on non-Windows Machines

You will need to launch each microservice individually to access all of the features of the program. Navigate to each of the subdirectories and run the following commands:
* crypto-notif-serviceA - `python notif.py`
* Crypto-Lookup-Microservice - `node .`
* logo-service - `node .`
* summary-service - `node .`

Then, to launch the core service, run this command from the root directory:

`python stock-and-crypto-trading_service/main.py`


  
