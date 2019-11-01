package main
 
import (
  "syscall/js"
)
 
func diff(this js.Value, args []js.Value) interface{} {
	dbType := args[0].String()
	sqlA := args[1].String()
	sqlB := args[2].String()
	callback := args[3]
	out := dbType + sqlA + sqlB
	callback.Invoke(js.Null(), out)
	return true
}
 
func main() {
	c := make(chan bool)
  js.Global().Set("_SQLDEF", js.FuncOf(diff))
  <-c
}
