# gaswoman

**gaswoman** tracks multisig gas spending for a [Safe](https://gnosis-safe.io/). It generates a JSON which can be imported with the [Safe Transaction Builder](https://help.gnosis-safe.io/en/articles/4680071-transaction-builder).

Built with [Node.js](https://nodejs.org/) and the [Safe Transaction Service API](https://safe-transaction-mainnet.safe.global/). Inspired by [gasman](https://github.com/peeldao/gasman).

## Installation

Clone with:

```bash
git clone https://github.com/filipvvv/gaswoman.git
```

```bash
cd gaswoman
```

## Usage

**gaswoman** accepts two command line arguments:

1. A Safe address, and
2. A Unix timestamp

Any transactions which were executed before the timestamp are ignored. Pass the arguments to gaswoman like so:

```bash
node . <safe-address> <timestamp>
```

For example, to calculate gas refunds for the JuiceboxDAO multisig since 2022-12-08, use:

```bash
node . 0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e 1670475600
```

To generate a timestamp, you can use a service like [unixtimestamp.com](https://www.unixtimestamp.com/).

**gaswoman** will write to `refunds.json`. To queue your transaction:

1. Open the [Safe App](https://app.safe.global/).
2. On the right-hand side of the screen, click "Use Transaction Builder".
3. Within the Transaction Builder, select "choose a file" (in the lower right-hand corner).
4. Navigate to the gaswoman directory, and double-click on `refunds.json`.
5. Click "Create Batch".
6. Click "Send Batch".
7. Click "Submit".
