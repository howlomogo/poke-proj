    // Just put this here for now
    
    // Right look, pagination is just a list a urls to hit.
    // This should only ever be called once, UNLESS we change the limit I.E how many pokemon we are showing on the page..
    // We probably dont want this in here to be honest.

    // This function will essentially need
    // listData.count
    // limit / offset
    // Base url

    // Generate list of pagination urls based off limit
    // let paginationUrls = []

    // // Set the pagination options
    // const paginationOptions = {
    //   limit: Number(params.limit) || 20, // If a limit has been passed in then use that other wise default to 20 per page
    //   offset: params.offset || 0 // Dont think we need this.?
    // }

    // NOTE!!! listdata is now just the results so count wont work unless we set it as new var somewhere
    // for (let i=0; i < listData.count; i+= paginationOptions.limit) {
    //   // Change for actual variables
    //   paginationUrls.push(`http://localhost:3000/pokemon?limit=${paginationOptions.limit}&offset=${i}`)
    // }