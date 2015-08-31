
module.exports = function(client, keys){

	var vals = '';

    function expandNS(ns, str) {
        var ps = str.split('.'),
            par = ns,
            pl, i;
        pl = ps.length;
        for (i = 0; i < pl; i++) {
            if (typeof par[ps[i]] === 'undefined') {
                par[ps[i]] = {};
            }
            par = par[ps[i]];
        }
        return par;
    }

	if (typeof client.globals !== 'undefined') {
		vals = expandNS(client["globals"], keys)
	};

	return vals;

}