/** @jsx React.DOM */

var ProductAdditionalInfo = React.createClass({
    render: function() {
        console.log(this.props.prize);
        return (
            <div className="additional-info">
                {this.props.prize}
            </div>
        );
    }
});

var Product = React.createClass({
    render: function() {
        var alt = this.props.product_name + ' by ' + this.props.name;
        var additional_info = '';
        if(this.props.prize) {
            additional_info = <ProductAdditionalInfo prize={this.props.prize} />
        }
        return (
            <div className="product">
                <img alt={alt} src={this.props.thumb_img_path} data-large_img={this.props.large_img_path} />
                <div className="info">
                    『{this.props.product_name}』({this.props.name})
                </div>
                {additional_info}
            </div>
        );
    }
});

var ProductList = React.createClass({
    render: function() {
        var ProductNodes = this.props.data.map(function(product) {
            var S3_BUCKET_PATH = 'http://kakashi.s3-ap-northeast-1.amazonaws.com/';
            var year = product.year.toString();
            var thumb_img_path = S3_BUCKET_PATH + year + '/' + product.thumb_img_path;
            var large_img_path = S3_BUCKET_PATH + year + '/' + product.large_img_path;
            return (
                <Product name={product.name} product_name={product.product_name} prize={product.prize} thumb_img_path={thumb_img_path} large_img_path={large_img_path} />
            );
        });
        return (
            <div className="productList">
                {ProductNodes}
            </div>
        );
    }
});

var ProductBox = React.createClass({
    getInitialState: function() {
        return {data: []}
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="productBox">
                <ProductList data={this.state.data} />
            </div>
        );
    }
});

React.renderComponent(
    <ProductBox url="products.json" pollInterval={2000} />,
    document.getElementById('content')
);
