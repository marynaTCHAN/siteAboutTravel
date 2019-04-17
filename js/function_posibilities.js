
$(document).ready(function(){

    var slider, slide;
    var current_slide = 0;

    function slider(slider) {
        slide = $(slider + ' ' + '.slide');/* наші слайди.
	slider - передаємо параметром вибраний нами слайдер"#slider" */
        slide_num = slide.length-1;// кол. слайдов
        /* ======== навігація слайдера ===========*/
        //створюємно навігацію
        var el;
        el = '<div class="slide_nav prev"></div>';
        el += '<div class="slide_nav next"></div>';
        $(slider).append(el);

        $(slider + ' ' + '.prev').on('click',function(){
            --current_slide; //зменшуємо по кліку на одиницю.
            if (current_slide < 0) {current_slide = slide_num}/* якщо число меньше 0,  присвоюємо йому
            current_slide = slide_num */
            show_slide(slider,current_slide);
        });

        $(slider + ' ' + '.next').on('click',function(){
            ++current_slide; //зменшуємо по кліку на одиницю.
            if (current_slide > slide_num) {current_slide = 0}
            // якщо число більше slide_num то присвоюємо йому 0
            show_slide(slider,current_slide);
        });
    }
    /* ========== функція для показу потрібного слайду ============*/
    function show_slide(slider,current_slide){
        slide = $(slider + ' ' + '.slide');/* наші слайди.
	slider - передаємо параметром вибраний нами слайдер "#slider" */
        slide.hide(); //ховаємо всі інші слайди

        slide.eq(current_slide).show(); // показуємо нам потрібний слайд
    }

    /*викликаємо нашу функциію slider('#slider') и передаємо параметром наший слайдер '#slider' */
    slider('#slider');
});
