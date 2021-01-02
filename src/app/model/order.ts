/**
 * @author : Sajeewa Dilshan <sajeewa@ijse.lk>
 * @since : 11/26/20
**/



export class Order{
    constructor(public cusId:string,public itemCode:Array<String> ,public des:String,public qty:Array<number>,public unitPrice:Array<number>,public totalPrice:number, public date:String){}
}
