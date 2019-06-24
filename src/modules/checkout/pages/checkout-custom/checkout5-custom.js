// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

! function($) {
    void 0 === String.prototype.replaceByStrOrRegex && (String.prototype.replaceByStrOrRegex = function(regexStr, replace) {
        var s = this;
        replace = replace || "";
        try {
            return validateRegex(regexStr) && (regexStr = new RegExp(regexStr)), s.replace(regexStr, replace);
        } catch (e) {
            return s;
        }
    }), void 0 === window.location.getQueryParams && (window.location.getQueryParams = function(search) {
        var query_string = {};
        try {
            if (search) {
                for (var vars = search.substring(1).split("&"), i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (void 0 === query_string[pair[0]]) query_string[pair[0]] = decodeURIComponent(pair[1]);
                    else if ("string" == typeof query_string[pair[0]]) {
                        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                        query_string[pair[0]] = arr;
                    } else query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
                return query_string;
            }
        } catch (e) {
            return console.log(e), query_string;
        }
    }(window.location.search)), void 0 === window.mobileAndTabletcheck && (window.mobileAndTabletcheck = function() {
        var check = !1;
        return function(a) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (check = !0);
        }(navigator.userAgent || navigator.vendor || window.opera), check;
    }), void 0 === String.prototype.removeDiacritics && (String.prototype.removeDiacritics = function() {
        var s = this;
        try {
            for (var diacritics = [
                    [/[\300-\306]/g, "A"],
                    [/[\340-\346]/g, "a"],
                    [/[\310-\313]/g, "E"],
                    [/[\350-\353]/g, "e"],
                    [/[\314-\317]/g, "I"],
                    [/[\354-\357]/g, "i"],
                    [/[\322-\330]/g, "O"],
                    [/[\362-\370]/g, "o"],
                    [/[\331-\334]/g, "U"],
                    [/[\371-\374]/g, "u"],
                    [/[\321]/g, "N"],
                    [/[\361]/g, "n"],
                    [/[\307]/g, "C"],
                    [/[\347]/g, "c"]
                ], i = 0; i < diacritics.length; i++) s = s.replace(diacritics[i][0], diacritics[i][1]);
            return s;
        } catch (e) {
            return s;
        }
    }), void 0 === String.prototype.contains && (String.prototype.contains = function(value) {
        try {
            return validateRegex(value) ? this.match(new RegExp(value)) : -1 != this.indexOf(value);
        } catch (e) {
            return console.error(e), !1;
        }
    });
    var validateRegex = function(pattern) {
        try {
            return new RegExp(pattern), !0;
        } catch (e) {
            return !1;
        }
    };
}(jQuery);
var CheckoutUtils = function() {
    function CheckoutUtils() {
        this.getOrderForm = function() {
            return this.orderForm;
        }, this.setOrderForm = function(orderForm) {
            this.orderForm = orderForm;
            try {
                this.orderForm.value && (this.orderForm.valueParsed = (orderForm.value / 100).toFixed(2));
            } catch (e) {
                console.log(e);
            }
            try {
                if (this.orderForm.items && this.orderForm.items.length > 0)
                    for (var i = 0; i < this.orderForm.items.length; i++) this.orderForm.items[i].priceParsed = (this.orderForm.items[i].price / 100).toFixed(2);
            } catch (e) {
                console.log(e);
            }
        }
    }
    var now = new Date(),
        dia = now.getUTCDate(),
        mes = now.getUTCMonth() + 1,
        ano = now.getUTCFullYear();
    return console.log(dia + "/" + mes + "/" + ano),
        CheckoutUtils.prototype.doVtexMessage = function(title, detail, type) {
            title = title || null, type = type || "info";
            var message = {
                content: {
                    title: title,
                    detail: detail,
                    type: type
                }
            };
            vtex.checkout.MessageUtils.messages.addMessage(message);
        },
        CheckoutUtils.prototype.mensagemBrindes = function() {
            if (console.log("mensagemBrindes"), !this.orderForm || 0 == Object.keys(this.orderForm).length) return console.log("orderForm is null"), void setTimeout(CheckoutUtils.mensagemBrindes(), 1500);
            var total = this.orderForm.valueParsed,
                rest = (499 - total).toFixed(2).toString().replace(".", ","),
                rest2 = (900 - total).toFixed(2).toString().replace(".", ","),
                rest3 = (490 - total).toFixed(2).toString().replace(".", ","),
                ativarSazional = !1;
            ativarSazional = window.location.getQueryParams && window.location.getQueryParams.modoDev ? window.location.getQueryParams.modoDev : ativarSazional, ativarSazional = 1 == ativarSazional || "true" == ativarSazional;

            var elToAppendCnt = $("#orderform-title"),
                msgEl = $(".orderform-title-msg"),
                txToAppendCnt = "Compre mais R$ " + rest + ' e ganhe <span style="color: #c50e1f;">frete grátis</span>',
                brinde = "manta";

            if (msgEl.length > 0 && msgEl.remove(), (total > 0 && total <= 499 ? total > 899 ? (txToAppendCnt = 'Parabéns! Você ganhou <span style="color: #c50e1f;">frete grátis</span>.', ativarSazional && (txToAppendCnt += " Compre mais R$ " + rest2 + ' e ganhe uma <span style="color: #bdcbff;"> ' + brinde + "</span>")) : ativarSazional && (txToAppendCnt += " ou mais R$ " + rest2 + ' e ganhe uma<span style="color: #84897a;"> ' + brinde + "</span>") : (txToAppendCnt = 'Parabéns! Você ganhou <span style="color: #c50e1f;">frete grátis.</span>', ativarSazional && (txToAppendCnt += ' e uma<span style="color: #84897a;"> ' + brinde + "</span>"))), total && total > 0) {
                var newEl = $("<div/>", {
                    class: "orderform-title-msg",
                    style: "font-size: 16px;background: black;color: white;text-align: center;padding: 6px 0;margin-top: 5px;",
                    html: txToAppendCnt
                });
                elToAppendCnt.before(newEl);
            }


            //Faixa de presente natal
            var d = new Date();
            // criando objeto
            var html = {};
            var dataAtual = {
                dia: dia,
                mes: mes,
                ano: ano,
                hora: d.getHours(),
                minutos: d.getMinutes()
            }

            if (dataAtual.mes == 12 && dataAtual.dia > 8) {
                $('body').addClass('foxing')
            }

        },
        CheckoutUtils.prototype.controleBrindes = function() {

        }, new CheckoutUtils();
}();
! function($, CheckoutUtils) {
    function disableSpecialChar() {
        var regex = /[^\w\s]/gi;
        $("#client-first-name").blur(function(evt) {
            $(this).val($(this).val().removeDiacritics().replaceByStrOrRegex(regex));
        }), $("#client-last-name").blur(function(evt) {
            $(this).val($(this).val().removeDiacritics().replaceByStrOrRegex(regex));
        });
    }

    function disableNonNumericsMobile() {
        mobileAndTabletcheck() && $(".postal-code").prop("type", "number");
    }
    $(document).ready(function() {
            disableSpecialChar();
        }), setTimeout(disableNonNumericsMobile, 5e3), setTimeout(disableNonNumericsMobile, 12e3), setTimeout(disableNonNumericsMobile, 2e4),
        $(window).on("hashchange", function() {
            console.log("Alguem atualizou o orderForm!"),
                disableNonNumericsMobile(),
                setTimeout(disableNonNumericsMobile, 5e3);
        });
}(jQuery),

function($, CheckoutUtils) {

}(jQuery),
function($, CheckoutUtils) {
    function validateCVCAndParcels() {
        if (window.location.hash.contains("#/payment")) try {
            var orderForm = CheckoutUtils.orderForm;
            orderForm && orderForm.clientProfileData && orderForm.clientProfileData.firstName.contains("*") && 4 == orderForm.paymentData.payments[0].paymentSystem && (!orderForm.paymentData.payments[0].installments || 1 == orderForm.paymentData.payments[0].installments) && CheckoutUtils.doVtexMessage("É necessário preencher o campo do código de segurança do cartão (CVC) e selecionar a opção de parcelamento desejada para finalizar a compra");
        } catch (e) {
            console.error(e);
        }
    }
    $(document).ajaxComplete(function(event, request, settings) {
        if (request.responseText) {
            var responseText = request.responseText.toString(),
                url = settings && settings.url ? settings.url : null;
            responseText.contains("orderFormId") && !url.contains("/transaction") && (responseText = JSON.parse(responseText), CheckoutUtils.setOrderForm(responseText), validateCVCAndParcels(), CheckoutUtils.mensagemBrindes());
        }
    }), $(window).on("orderFormUpdated.vtex", function(evt, orderForm) {}), $(window).on("hashchange", function() {
        validateCVCAndParcels();
    }), $(window).on("orderFormUpdated.vtex", function(evt, orderForm) {
        CheckoutUtils.setOrderForm(orderForm);
        var timeout = setTimeout(function() {
            CheckoutUtils.showServices(true);
            clearInterval(timeout);
        }, 2000);
    });
}(jQuery, CheckoutUtils);

function tiracento(strToReplace) {
    str_trocarIsso = "&àáâãäåçèéêëìíîïñòóôõöùüúÿÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖOÙÜÚŸ";
    str_porIsso = "eaaaaaaceeeeiiiinooooouuuyAAAAAACEEEEIIIINOOOOOOUUUY";
    str_nova = "";
    for (i = 0; i < strToReplace.length; i++) {
        if (str_trocarIsso.search(strToReplace.substr(i, 1)) >= 0) {
            str_nova += str_porIsso.substr(str_trocarIsso.search(strToReplace.substr(i, 1)), 1)
        } else {
            str_nova += strToReplace.substr(i, 1)
        }
    }
    return str_nova;
}

function replace_ship(elemento) {
    onComponentLoaed(elemento)
        .then(function(element) {
            element.keyup(function(e) {
                var er = /[^a-z 0-9]/gi;
                texto = $(this).val().replace(/[*\(\)\+\[\?]/, "");
                texto = texto.replace('(', "");
                texto = texto.replace(')', "");
                texto = tiracento(texto);
                texto = texto.replace(er, "");
                if (elemento == '#client-first-name' || elemento == '#client-last-name') {
                    texto = texto.replace(/[0-9]/, "");
                }
                element.val(texto);
            });
            if (elemento == '#ship-number') {
                element.attr('maxlength', '10');
                element.attr('data-parsley-maxlength', '10');
            }
        }, function(e) {
            console.log(e);
        })
}

/*Não permitindo caracteres especiais para o campo de nome, sobrenome, númerodo endereço e complemento e limitando a qtd para 10 no campo número da parte de endereço do checkout*/
window.dispatchEvent(new HashChangeEvent("hashchange"));
$(window).on("hashchange", function() {
    switch (window.location.hash.replace("#/", "")) {
        case "shipping":
            replace_ship("#ship-number");
            replace_ship("#ship-more-info");
            break;
        case "profile":
            replace_ship("#client-first-name");
            replace_ship("#client-last-name");
            break;
        default:
            break;
    }
});

$(document).on('click', '.link-edit, #edit-shipping-data', function() {
    replace_ship("#ship-number");
    replace_ship("#ship-more-info");
})
$(document).on('change', '#ship-postal-code', function() {
    replace_ship("#ship-number");
    replace_ship("#ship-more-info");
});
$(document).on('focusout', '#ship-postal-code', function() {
    replace_ship("#ship-number");
    replace_ship("#ship-more-info");
});
/*Fica verificando através de setinterval se um elemento existe*/
function onComponentLoaed(element) {
    return new Promise(function(resolve, reject) {
        var seconds = 0;
        var interval = setInterval(function() {
            if ($(element).length > 0) {
                resolve($(element));
                return;
            }

            if (seconds === 2000) {
                reject("element not find");
                clearInterval(interval);
                return;
            }

            seconds += 50;
        }, 50);
    })
}

$(window).load(function() {
    CheckoutUtils.showServices(false);
});

! function(e) {
    "use strict";
    var r, s = [],
        u = e.document,
        n = e.MutationObserver || e.WebKitMutationObserver;

    function o() {
        for (var e, t, r = 0, n = s.length; r < n; r++) {
            e = s[r];
            for (var o, c = 0, l = (t = u.querySelectorAll(e.selector)).length; c < l; c++)(o = t[c]).ready || (o.ready = !0, e.fn.call(o, o))
        }
    }
    e.ready = function(e, t) {
        s.push({
            selector: e,
            fn: t
        }), r || (r = new n(o)).observe(u.documentElement, {
            childList: !0,
            subtree: !0
        }), o()
    }
}(this);