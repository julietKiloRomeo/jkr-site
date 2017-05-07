        function pattern_text(N, M, increase)
        {
            var msg = "<div class='columns is-mobile'> <div class='column is-4'>"
            msg += N + "</div>"
            msg +="<div class='column is-4'> <i class='fa fa-times my-is-centered'></i> </div>"
            msg += "<div class='column is-4'>"
            if (increase)
            {
                if (M>1)
                {
                    msg    += (M-1)+' + '
                }
                msg    += '1<i class="fa fa-caret-right my-is-centered"></i>2'
            }else
            {
                if (M>2)
                {
                    msg    += (M-2)+' + '
                }
                msg    += '2<i class="fa fa-caret-right my-is-centered"></i>1'
            }
            msg += "</div></div>"
            if (N==0){msg='';}



            return msg;
        } 
        
        function alter(id, inc )
        {
            var element = document.getElementById(id);
            var val     = parseInt(element.value, 10);

            new_val = val + inc

            element.value = Math.floor(new_val)
        }        

        function jCrease()
        {
            var from = parseInt(document.getElementById('id_out_from').value, 10);
            var to   = parseInt(document.getElementById('id_out_to').value, 10);

            var N             = Math.abs(from-to)

            var small_pattern = Math.floor(from/N);
            var large_pattern = small_pattern + 1;
            
            var from_small    = N*small_pattern
            var N_large       = from - from_small
            var N_small       = N-N_large

 
            if (from==to)
            {
                $("#first-pattern" ).html('');
                $("#first-pattern").css('visibility', 'hidden');
                $("#second-pattern").html('');
                $("#second-pattern").css('visibility', 'hidden');
            }
            else
            {
                $("#first-pattern").css('visibility', 'visible');
                $("#first-pattern" ).html( pattern_text(N_small, small_pattern, to>from) );
                var msg = pattern_text(N_large, large_pattern, to>from)
                if(msg=='')
                {
                    $("#second-pattern").css('visibility', 'hidden');
                    $("#second-pattern").html( msg );
                }
                else
                {
                    $("#second-pattern").css('visibility', 'visible');
                    $("#second-pattern").html( msg );
                }
            }
        }

        function open_help(){ $('#help').addClass('is-active') ;
                              console.log('Open'); }

        function close_help(){ $('#help').removeClass('is-active') ;
                              console.log('Close'); }


        $( document ).ready(function() {

            document.getElementById('more-from').onclick = function() {
                alter('id_out_from', 1);
                jCrease();
            }
            document.getElementById('more-to').onclick = function() {
                alter('id_out_to', 1);
                jCrease();
            }
            document.getElementById('much-more-to').onclick = function() {
                alter('id_out_to', 10);
                jCrease();
            }
            document.getElementById('much-more-from').onclick = function() {
                alter('id_out_from', 10);
                jCrease();
            }
            document.getElementById('less-from').onclick = function() {
                alter('id_out_from', -1);
                jCrease();
            }
            document.getElementById('less-to').onclick = function() {
                alter('id_out_to', -1);
                jCrease();
            }
            document.getElementById('much-less-to').onclick = function() {
                alter('id_out_to', -10);
                jCrease();
            }
            document.getElementById('much-less-from').onclick = function() {
                alter('id_out_from', -10);
                jCrease();
            }


            document.getElementById('multiply-from').onclick = function() {
                alter('id_out_from', 50);
                jCrease();
            }
            document.getElementById('divide-from').onclick = function() {
                alter('id_out_from', -50);
                jCrease();
            }
            document.getElementById('multiply-to').onclick = function() {
                alter('id_out_to', 50);
                jCrease();
            }
            document.getElementById('divide-to').onclick = function() {
                alter('id_out_to', -50);
                jCrease();
            }

            jCrease()


            document.getElementById('open-help').onclick = function()
                { 
                    console.log('help!') ;
                    $('#help').addClass('is-active') ;
                }




        });
