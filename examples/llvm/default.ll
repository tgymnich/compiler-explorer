declare dso_local double @__enzyme_autodiff(i8*, double)

define double @square(double %x) {
entry:
  %mul = fmul double %x, %x
  ret double %mul
}

define double @dsquare(double %x) local_unnamed_addr {
entry:
  %call = tail call double @__enzyme_autodiff(i8* bitcast (double (double)* @square to i8*), double %x)
  ret double %call
}
