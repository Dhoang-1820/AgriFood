function FormatCurrency(money) {
    const moneyFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)

    return moneyFormatted
}

export default FormatCurrency
