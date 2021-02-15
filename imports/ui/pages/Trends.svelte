<script>
  import { onMount, afterUpdate } from 'svelte'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import {
    format,
    add,
    isToday,
    isAfter,
    startOfMonth,
    endOfMonth,
  } from 'date-fns'

  import { formatMoney, dateFormatter } from '../helpers'
  import { Accounts, Transactions } from '../../api/collections'
  import Header from '../components/Header'
  import Card from '../components/Card'
  import AccountFormatter from '../components/AccountFormatter'
  import AccountDetail from '../components/AccountDetail'
  import TrendsDisplay from '../components/TrendsDisplay'

  export let location
  let selectedAccount = {}
  let showSlideover = false
  let selectedDate = new Date()
  let startDate = new Date(startOfMonth(selectedDate))
  let endDate = new Date(endOfMonth(selectedDate))

  onMount(async () => {
    Meteor.subscribe('allAccounts')
    Meteor.subscribe('transactionsByDate', startDate, endDate)
  })

  $: allAccounts = useTracker(() => Accounts.find({}).fetch())
  $: allTransactions = useTracker(() =>
    Transactions.find(
      {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      { date: -1 }
    ).fetch()
  )
</script>

<TrendsDisplay transactions="{$allTransactions}" />
