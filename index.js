function deepEqual(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false

  for (let key of Object.keys(a)) {
    if (typeof a[key] === typeof b[key]) {
      if (typeof a[key] === "object") {
        return deepEqual(a[key], b[key])
      } else if (a[key] !== b[key]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

const ChatUser = (function() {
  let users = []

  const reducer = action => {
    switch (action.type) {
      case "ADD_USER":
        return [...users, action.payload]
      case "REMOVE_USER":
        return [...users.filter(user => !deepEqual(action.payload, user))]
      case "GET_USERS":
        return [...users]
    }
  }

  const mutate = action => {
    console.log(action)
    return (users = reducer(action))
  }

  return {
    addUser: user => mutate({ type: "ADD_USER", payload: user }),
    removeUser: user => mutate({ type: "REMOVE_USER", payload: user }),
    getUsers: () => reducer({ type: "GET_USERS" })
  }
})()

ChatUser.addUser({ name: "Jack" })
ChatUser.addUser({ name: "Waldo" })
ChatUser.addUser({ name: "Chris" })
ChatUser.removeUser({ name: "Jack" })
const chatUser = ChatUser.getUsers()
