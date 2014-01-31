root = global ? window

if not root.ShareCoffee? or not root.ShareCoffee.REST?
	throw new Error("LoadError")

root.<%= addOnName%> = {}