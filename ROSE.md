# LYSENT ROSE
## I'll get it right this time

This is basically voodoo magic and just reading the comments probably won't help.

## CONTENTS
- [`lys.rose.privateKey`](#privateKey)
- [`lys.rose.planter`](#planter)
- [`threads`](#threads)


## PrivateKey

Syntax: 
```javascript 
let key = lys.rose.privateKey(myObject, myValue)
```

The only way of acessing `myValue` is having `key`, using it as such:<br>
```javascript
myObject[key] // returns myValue
```


## Planter

The `planter` method is a way of quickly accessing the ROSE context. Here is anexample with ROSE threads, presented later:

```javascript
// making a sequential thread without planter
let thread = lys.rose[lys.rose.petals.THREAD][lys.rose.petals.SEQ]; // long, unreadable

// with planter
let thread = lys.rose.planter( ({ R, THREAD, SEQ }) => { // <= requesting values from context
	return R[THREAD][SEQ]; // <= using them, giving us clean code
})
```

This might not be a super good example in this case, but you can see how it would simplify longer operations.

## threads
documentation coming soon.