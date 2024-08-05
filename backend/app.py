from flask import Flask, request, jsonify
from flask_cors import CORS
import ipaddress

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes


@app.route('/api/calculate', methods=['GET'])
def calculate_subnet():
    ip = request.args.get('ip')
    mask = request.args.get('mask')

    if not ip or not mask:
        return jsonify({"error": "Both IP and mask are required"}), 400

    try:
        network = ipaddress.IPv4Network(f"{ip}/{mask}", strict=False)

        return jsonify({
            "network_address": str(network.network_address),
            "broadcast_address": str(network.broadcast_address),
            "number_of_hosts": network.num_addresses - 2,
            "usable_host_range": f"{network.network_address + 1} - {network.broadcast_address - 1}",
            "subnet_mask": str(network.netmask),
            "wildcard_mask": str(network.hostmask),
            "binary_subnet_mask": format(int(network.netmask), '032b'),
            "cidr_notation": network.with_prefixlen,
            "network_class": get_network_class(network.network_address)
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


def get_network_class(ip):
    first_octet = int(str(ip).split('.')[0])
    if 1 <= first_octet <= 126:
        return "A"
    elif 128 <= first_octet <= 191:
        return "B"
    elif 192 <= first_octet <= 223:
        return "C"
    elif 224 <= first_octet <= 239:
        return "D (Multicast)"
    elif 240 <= first_octet <= 255:
        return "E (Reserved)"
    else:
        return "Invalid"


if __name__ == '__main__':
    app.run(debug=True)