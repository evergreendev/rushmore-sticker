export const calculateTotals = (numberOfStickers:string) => {
    const stickerBasePrice = parseInt(numberOfStickers) * 5;
    let discountStickers = parseInt(numberOfStickers);
    const discountMap =
        {
            10: 10,
            3: 2
        }
    let currDiscount = "10";
    let remainder = 0;
    let finalDiscount = 0;

    while(discountStickers > 0){
        remainder = discountStickers % parseInt(currDiscount);
        discountStickers -= remainder;

        // @ts-ignore
        finalDiscount += (discountStickers/parseInt(currDiscount))* discountMap[currDiscount];

        if (currDiscount === "10"){
            currDiscount = "3"
            discountStickers = remainder;
        } else if (currDiscount === "3"){
            discountStickers = 0;
        }
    }


    const total = (stickerBasePrice - finalDiscount);
    const tax = (stickerBasePrice - finalDiscount)*.062;
    const totalWithTax = total + tax;

    return {
        totalDiscounts: finalDiscount,
        tax: tax,
        totalFormatted: total.toFixed(2),
        total: total,
        totalWithTax,
        totalWithTaxFormatted: totalWithTax.toFixed(2)
    }
}