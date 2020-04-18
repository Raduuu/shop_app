import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Cookie from 'js-cookie'

const StyledList = styled.ul`
    li {
        display: inline-block;
        margin-right: 30px;
    }
`

class Header extends React.Component {
    handleLogout = () => {
        Cookie.remove('token')
        Cookie.remove('email')
        Cookie.remove('isAdmin')
        Cookie.remove('cart')
        Cookie.remove('coins')
        this.props.history.push('/login')
    }

    getCartProducts = () => {
        let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            total = total + parseInt(cart[i].quantity)
        }
        return total
    }
    render() {
        const isAdmin = Cookie.get('isAdmin')
        const cartProducts = this.getCartProducts()
        return (
            <StyledList>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                )}
                <li>
                    <Link to="/password">Change password</Link>
                </li>
                <li>
                    <Link to="/cart">{`Cart(${cartProducts})`}</Link>
                </li>
                <li>
                    {/* eslint-disable-next-line */}
                    <a href="" onClick={this.handleLogout}>
                        Logout
                    </a>
                </li>
            </StyledList>
        )
    }
}

export default withRouter(Header)
