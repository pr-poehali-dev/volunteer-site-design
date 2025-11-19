import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    passport: "",
    phone: "",
    email: "",
    militaryId: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = "Введите полное ФИО (минимум 3 символа)";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Укажите дату рождения";
    }

    const passportRegex = /^\d{4}\s?\d{6}$/;
    if (!passportRegex.test(formData.passport.replace(/\s/g, ""))) {
      newErrors.passport = "Формат: 1234 567890";
    }

    const phoneRegex = /^(\+7|8)\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = "Формат: +79991234567 или 89991234567";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (formData.militaryId && !/^[А-Я]{2}\s?\d{7}$/.test(formData.militaryId)) {
      newErrors.militaryId = "Формат: АА 1234567";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Укажите адрес регистрации";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setFormData({
        fullName: "",
        birthDate: "",
        passport: "",
        phone: "",
        email: "",
        militaryId: "",
        address: "",
        message: "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-primary-foreground flex items-center gap-2">
              <Icon name="Shield" size={28} />
              Служба России
            </h1>
            <div className="hidden md:flex gap-6">
              {["hero", "requirements", "conditions", "application", "faq"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-primary-foreground hover:text-accent transition-colors font-medium"
                >
                  {section === "hero" && "Главная"}
                  {section === "requirements" && "Требования"}
                  {section === "conditions" && "Условия"}
                  {section === "application" && "Заявка"}
                  {section === "faq" && "Вопросы"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Защищай Родину. Служи с честью.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйся к рядам добровольцев. Получи достойные условия, 
            социальные гарантии и возможность защитить свою страну.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("application")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Подать заявку
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection("requirements")}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="requirements" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
            Требования к кандидатам
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "User", title: "Возраст", desc: "От 18 до 50 лет" },
              { icon: "Heart", title: "Здоровье", desc: "Годен по состоянию здоровья" },
              { icon: "FileCheck", title: "Гражданство", desc: "Гражданин РФ" },
              { icon: "Award", title: "Образование", desc: "Не ниже среднего" },
              { icon: "ShieldCheck", title: "Дисциплина", desc: "Без судимостей" },
              { icon: "Target", title: "Мотивация", desc: "Готовность служить Родине" },
            ].map((item, i) => (
              <Card key={i} className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="conditions" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
            Условия службы
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "Wallet", title: "Достойная оплата", desc: "Конкурентное денежное довольствие с первого дня службы" },
              { icon: "Home", title: "Жилье", desc: "Обеспечение жильем на период службы" },
              { icon: "HeartPulse", title: "Медицина", desc: "Полное медицинское обслуживание для вас и семьи" },
              { icon: "GraduationCap", title: "Обучение", desc: "Профессиональная подготовка и повышение квалификации" },
              { icon: "Shield", title: "Страхование", desc: "Полное страхование жизни и здоровья" },
              { icon: "TrendingUp", title: "Карьера", desc: "Возможность продвижения по службе" },
            ].map((item, i) => (
              <Card key={i} className="border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={24} className="text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-base">{item.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="application" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-primary">
            Подача заявки
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Заполните форму, и наш специалист свяжется с вами в течение 24 часов
          </p>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">ФИО *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Дата рождения *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange("birthDate", e.target.value)}
                      className={errors.birthDate ? "border-destructive" : ""}
                    />
                    {errors.birthDate && <p className="text-sm text-destructive">{errors.birthDate}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passport">Паспорт РФ *</Label>
                    <Input
                      id="passport"
                      value={formData.passport}
                      onChange={(e) => handleChange("passport", e.target.value)}
                      placeholder="1234 567890"
                      className={errors.passport ? "border-destructive" : ""}
                    />
                    {errors.passport && <p className="text-sm text-destructive">{errors.passport}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="militaryId">Военный билет</Label>
                    <Input
                      id="militaryId"
                      value={formData.militaryId}
                      onChange={(e) => handleChange("militaryId", e.target.value)}
                      placeholder="АА 1234567"
                      className={errors.militaryId ? "border-destructive" : ""}
                    />
                    {errors.militaryId && <p className="text-sm text-destructive">{errors.militaryId}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+7 999 123 45 67"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="ivanov@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Адрес регистрации *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Дополнительная информация</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Расскажите о себе, опыте, мотивации..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Отправить заявку
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
            Часто задаваемые вопросы
          </h3>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Какой срок службы по контракту?",
                a: "Срок службы определяется контрактом и может составлять от 1 года. Возможно продление по желанию.",
              },
              {
                q: "Предоставляется ли отпуск?",
                a: "Да, военнослужащим по контракту предоставляется ежегодный оплачиваемый отпуск продолжительностью 30 суток.",
              },
              {
                q: "Какая медицинская поддержка?",
                a: "Полное медицинское обслуживание в военных госпиталях и поликлиниках для вас и членов вашей семьи.",
              },
              {
                q: "Что входит в денежное довольствие?",
                a: "Оклад по должности, оклад по званию, надбавки за выслугу лет, премии и другие выплаты согласно законодательству РФ.",
              },
              {
                q: "Нужна ли специальная подготовка?",
                a: "Базовая физическая подготовка приветствуется. Всю необходимую военную подготовку вы получите в ходе обучения.",
              },
              {
                q: "Как быстро рассматривается заявка?",
                a: "Первичное рассмотрение занимает до 24 часов. После этого с вами свяжется специалист для уточнения деталей.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Shield" size={32} />
            <h4 className="text-2xl font-bold">Служба России</h4>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Официальный портал набора добровольцев
          </p>
          <div className="flex justify-center gap-6 text-sm text-primary-foreground/60">
            <span>© 2024 Все права защищены</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
