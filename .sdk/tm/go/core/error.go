package core

type PagespeedError struct {
	IsPagespeedError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPagespeedError(code string, msg string, ctx *Context) *PagespeedError {
	return &PagespeedError{
		IsPagespeedError: true,
		Sdk:              "Pagespeed",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PagespeedError) Error() string {
	return e.Msg
}
