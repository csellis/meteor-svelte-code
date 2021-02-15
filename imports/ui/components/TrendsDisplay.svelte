<script>
  export let transactions

  const one = ['Transfer', 'Deposit', 'Check']
  const two = ['Transfer', 'Debit']

  const transaction = '1'
  const result = {
    Transfer: {
      Deposit: {
        Check: [{ transaction }, { transaction }],
      },
      Debit: [{ transaction }, { transaction }],
    },
  }

  function groupCategories(transactions, categories = {}) {
    console.log(transactions)
    const onlyCategories = transactions.map((trans) => {
      return trans.category
    })
    // convert to multidimensional array
    var tree = onlyCategories.reduce(function (tree, item) {
      var tempTree = tree
      for (var i = 0; i < item.length; i++) {
        if (!tempTree[item[i]]) tempTree[item[i]] = {}
        tempTree = tempTree[item[i]]
      }
      return tree
    }, {})

    for (let transaction of transactions) {
      const categories = transaction.category
      // find place in object
      for (let cat of categories) {
      }
    }
    console.log(tree)
  }
  // function groupOCategories(transactions) {
  //   transactions.forEach((transaction) => {
  //     const first = transaction.category[0]
  //     const second = transaction.category[1]
  //     const third = transaction.category[2]
  //     console.log({ first, second, third })
  //     if (!categories[first]) {
  //       categories[first] = {}
  //     } else {
  //       if (!categories[first][second]) {
  //         categories[first][second] = {}
  //       } else {
  //         if (!categories[first][second][third]) {
  //           categories[first][second][third] = {}
  //         }
  //       }
  //     }
  //   })
  //   console.log(categories)
  // }
</script>

{groupCategories(transactions)}

{#each transactions as transaction}
  <li>{transaction.name}: {transaction.amount}</li>
{/each}
