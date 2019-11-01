package main
 
import (
	"fmt"
	"strings"
  "syscall/js"
  "github.com/k0kubun/sqldef/schema"
)

func showDDLs(ddls []string, skipDrop bool) {
	fmt.Println("-- dry run --")
	for _, ddl := range ddls {
		if skipDrop && strings.Contains(ddl, "DROP") {
			fmt.Printf("-- Skipped: %s;\n", ddl)
			continue
		}
		fmt.Printf("%s;\n", ddl)
	}
}

func diff(this js.Value, args []js.Value) interface {} {
	mode := args[0].String()
	desiredDDLs := args[1].String()
	currentDDLs := args[2].String()
	callback := args[3]
	generatorMode := schema.GeneratorModeMysql
	if (mode == "postgres"){
		generatorMode = schema.GeneratorModePostgres
	}
	ddls, err := schema.GenerateIdempotentDDLs(generatorMode, desiredDDLs, currentDDLs)
	showDDLs(ddls, false)
	out := strings.Join(ddls, "\n")
	callback.Invoke(js.Null(), out)
	// TODO: Figure out how to use error in callback
	_ = err
	return true
}
 
func main() {
	c := make(chan bool)
	// I wish this wasn't global!
  js.Global().Set("_SQLDEF", js.FuncOf(diff))
  <-c
}
