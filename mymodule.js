const calc = (a,b,p) => {
    {
    if(a&&b&&p){

        switch(p){
            case'+':
            {
                return a+b;
                break;
            }
            case'-':
            {
                return a-b;
                break;
            }
            case'*':
            {
                return a*b;
                break;
            }
            case'/':
            {
                return a/b;
                break;
            }
            default:
                {
                return;
                }
        }
    }else  return "please provide all pẩmeters";
    }
}
        exports.calc=calc;
