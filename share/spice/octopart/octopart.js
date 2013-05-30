var ddg_spice_octopart = function(api_result) {

    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var query;
    $("script").each(function() {
        var matched, result; 
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/octopart\/(.+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    var results = [];
    for(var i = 0; i < api_result.results.length; i += 1) {
        if(api_result.results[i].item.images.length > 0) {
            results.push(api_result.results[i]);
        } else {
            api_result.results[i].item.images.push({
                url_90px: "http://n1.octostatic.com/o3web/detail/images/camera-icon.8ef4d9f52c3be05d143196b967ba629b.png"
            });
            results.push(api_result.results[i]);
        }
    }

    if(results.length === 0) {
        return;
    }

    Spice.render({
        source_name : 'Octopart',
        source_url : 'http://octopart.com/partsearch#search/requestData&q=' + query,
        header1 : api_result.request.q + " (Octopart)",
        template_frame: "carousel",
        template_normal: "octopart",
        carousel_css_id: "octopart",
        carousel_template_detail: "octopart_details",
        carousel_items: results,
        force_no_fold : 1
    });
};

Handlebars.registerHelper("toFixed", function(number) {
    return number.toFixed(2);
});

Handlebars.registerHelper("escapeURL", function(string) {
    return encodeURIComponent(string);
});

Handlebars.registerHelper("trim", function(string) {
    return string.replace(/[^:]+:\s/, "");
});