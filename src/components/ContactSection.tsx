import ContactIcon from '@/assets/contact.svg';

export default function ContactSection() {
  return (
    <section id="elerhetoseg" className=" py-12">
      <div className="pb-4 pr-4 sm:float-left">
        <ContactIcon className="h-32 w-32" />
      </div>

      <div>
        <h2 className="font-bold">Elérhetőség</h2>
        <b>Email:</b> mail@papirsarkany.hu
        <br />
        <b>Telefon:</b> 0630 9754 786
        <iframe
          title="terkep"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
          className="h-[600px] w-full rounded-3xl"
        />
      </div>
    </section>
  );
}
