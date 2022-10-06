class Tostar {
    static count = 3;
    time= 0;
    constructor(message, type) {
       this.message = message;
       this.type = type;
    }
    
/*    counterBack() {
        try{
            if ( Tostar.count > 0 ){
                Tostar.count--;
                this.time = setTimeout(() => {this.counterBack()}, 1000);
            }else{
                clearTimeout(this.time);
                Tostar.count = 3;
                return true;
            }
        }catch(err){
            console.log(err)
        }
    }  */  
 
}  
export default Tostar;
