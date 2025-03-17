# Hope Slider

Hope Slider, akıcı ve kesintisiz kaydırma deneyimi sunan hafif ve esnek bir JavaScript slider kütüphanesidir. Minimalist yapısıyla hızlı entegrasyon sağlar.

## Özellikler
- **Smooth Scrolling**: Son derece akışkan ve kesintisiz kaydırma deneyimi sunar.
- **Loop Desteği**: Slider bitiş noktasına geldiğinde otomatik olarak başa sarar ve sonsuz bir döngü oluşturur.

## Kurulum
Kütüphaneyi projenize dahil etmek için aşağıdaki adımları takip edebilirsiniz.


## Kullanım
Aşağıdaki gibi basit bir yapı ile Hope Slider'ı kullanabilirsiniz:

```html
<div class="hope-slider">
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
</div>
```

Ve JavaScript ile başlatın:

```js
const hopeSlider = new HopeSlider(document.querySelector(".hope-slider"), {
    threshold: 50,
    loop: true,
    navigation: {
        prevEl: '.prev',
        nextEl: '.next'
    },
    pagination: {
        el: '.pagination'
    },
    logEl: "#log-container",
    callbacks: {
        // onSlideStart: (index) => console.log("Slide Start:", index),
        // onSlideChange: (index) => console.log("Slide Changed:", index),
        // onSlideEnd: (index) => console.log("Slide End:", index),
        // onSlideProgress: (index, diff) => console.log("Slide Progress:", index, diff),
        // onTranslateX: (position) => console.log("TranslateX Position:", position)
    }
});
```

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır.

