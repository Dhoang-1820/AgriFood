import classnames from 'classnames/bind'
import styles from './Footer.module.scss'
import images from '~/assets/images'

const cx = classnames.bind(styles)

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('footer-slogan')}>
                    <div className={cx('item')}>
                        <img
                            src='https://cdn-crownx.winmart.vn/images/prod/162964655378716287682220181 (1).png'
                            alt='img-footer-banner'
                        />
                        <h3 className={cx('title')}>Sản phẩm an toàn</h3>
                    </div>
                    <div className={cx('item')}>
                        <img
                            src='https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462%20(1).png'
                            alt='img-footer-banner'
                        />
                        <h3 className={cx('title')}>Chất lượng cam kết</h3>
                    </div>
                    <div className={cx('item')}>
                        <img
                            src='https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943%20(1).png'
                            alt='img-footer-banner'
                        />
                        <h3 className={cx('title')}>Dịch vụ vượt trội</h3>
                    </div>
                    <div className={cx('item')}>
                        <img
                            src='https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154%20(1).png'
                            alt='img-footer-banner'
                        />
                        <h3 className={cx('title')}>Giao hàng nhanh </h3>
                    </div>
                </div>
            </div>
            <div className={cx('footer-infor')}>
                <div className={cx('policies')}>
                    <img src={images.logo} alt='logo' className={cx('logo')} />
                    <p className={cx('text')}>Công Ty xx</p>
                    <p className={cx('text')}>
                        Mã số doanh nghiệp: xxxx Đăng ký lần đầu ngày xx tháng xx năm 20xx, đăng ký thay đổi lần thứ xx,
                        ngày xx tháng xx năm xxxx
                    </p>
                </div>
                <div className={cx('about-us')}>
                    <h4 className={cx('title')}>Về chúng tôi</h4>
                    <a href='/'>Giới thiệu về AgriFoods</a>
                    <a href='/'>Danh sách cửa hàng</a>
                    <a href='/'>Quản lý chất lượng</a>
                    <a href='/'>Chính sách bảo mật và chia sẻ thông tin</a>
                    <a href='/'>Điều khoản và điều kiện giao dịch</a>
                </div>
                <div className={cx('support')}>
                    <h4 className={cx('title')}>Hỗ trợ khách hàng</h4>
                    <a href='/'>Trung tâm hỗ trợ khách hàng</a>
                    <a href='/'>Chính sách giao hàng</a>
                    <a href='/'>Chính sách thanh toán</a>
                    <a href='/'>Chính sách đổi trả</a>
                    <a href='/'>Chính sách chiết khấu ưu đãi mua sắm</a>
                </div>
                <div className={cx('hotline')}>
                    <h4 className={cx('title')}>Chăm sóc khách hàng</h4>
                    <a href='/'>Mua Online: 00000000</a>
                    <a href='/'>Email: cskh@agrifoods.com</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
