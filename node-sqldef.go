package main
 
import (
    "fmt"
    "syscall/js"
)
 
func diff(this js.Value, args []js.Value) interface{} {
	dbType := args[0].String()
	sqlA := args[1].String()
	sqlB := args[2].String()
	fmt.Println("Hello ", dbType, sqlA, sqlB)

	return dbType
}
 
func main() {
	c := make(chan bool)
  js.Global().Set("_SQLDEF", js.FuncOf(diff))
  <-c
}
