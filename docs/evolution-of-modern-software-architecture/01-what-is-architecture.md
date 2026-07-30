# 1. Architecture Nedir?

Yazılım geliştirmeye yeni başlandığında genellikle birkaç kişi aynı proje üzerinde çalışır. Kod miktarı az olduğu için herkes kodun nerede olduğunu kolayca bulabilir. Ancak proje büyüdükçe:

* geliştirici sayısı artar,
* kod miktarı yüz binlerce satıra ulaşır,
* farklı ekipler aynı projeye dokunur,
* istekler sürekli değişir,
* bakım maliyeti artar.

Bu durumda en büyük problem ortaya çıkar:

> **“Hangi kod nerede olmalı?”**

Eğer herkes kafasına göre kod yazarsa:

* aynı işlem farklı yerlerde tekrar edilir,
* değişiklik yapmak zorlaşır,
* hata bulmak uzun sürer,
* yeni gelen geliştirici sistemi anlayamaz.

Bu yüzden yazılım dünyası **düzenli, anlaşılır ve sürdürülebilir sistemler** oluşturmak için mimari yaklaşımlar geliştirmiştir.