# twitter competition system, add winners
added to user table, marked as winners.

we do not have wallet address

# user registers at website

we will get wallet address

unupdatedAllowlist = [address,address]
unupdatedNumSlots = [3,3]
addresses will be supplied to /getUnupdatedAllowlist

hansel's private machine will call  /getUnupdatedAllowlist  and use the data to call seedAllowlist



## expiry of allowlist

after 36hrs, we need to need to remove the address's allowlist

we do this with the server adding values to /getUnupdatedAllowlist

unupdatedAllowlist = [expiredAddress,expiredAddress]
unupdatedNumSlots = [0,0]
hansel's private machine will call  /getUnupdatedAllowlist  and use the data to call seedAllowlist


### unupdatedAllowlist 
unupdatedAllowlist will contain both new , as well as expired addresses

[newAddress,expiredAddress]
[3,0]