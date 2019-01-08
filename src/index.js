const TelegramBot = require("node-telegram-bot-api")
const mongoose = require('mongoose')
const config = require('./config.js')
const geolib = require('geolib')
const _ = require('lodash')
const helper = require('./helpers.js')
const kb = require('./keyboards-buttons.js')
const keyboard = require('./keyboard')
const database = require('../database.json')

const TOKEN = '654935132:AAFqfF3tFtVrUWookKEYTuYCWtcB8iy2_tA'

helper.logStart()

mongoose.connect('mongodb://localhost/wfmcinema')
    .then(() => console.log('MongoDB has started...'))
    .catch(e => console.log(e))


require('./models/film.model')
require('./models/cinema.model')

const Film = mongoose.model('films')
const Cinema = mongoose.model('cinemas')

//database.films.forEach(f => new Film(f).save().catch(e => console.log(e)))

//database.cinemas.forEach(c => new Cinema(c).save().catch(e => console.log(e)))
// ==============================================================================


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});



const bot = new TelegramBot(TOKEN,  {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

bot.on('message', msg=>{
    console.log('Working', msg.from.first_name)

    const chatId = helper.getChatId(msg)

    switch(msg.text) {


        case kb.home.films:
            bot.sendMessage(chatId, 'Выберете товар:\n' +
                '\n' +
                ' \n' +
                '   • Ёлка - 1 шт.  =13$ -  ответ -  /1 \n' +
                ' \n' +
                '   • Витамин А - 1 шт.  =14$ -  ответ -  /2 \n' +
                ' \n' +
                ' • Сосна- 2 шт.  =15$ -  ответ -  /3 \n' + '\n' +
                '  • Тростниковый сахар - 0.5 уп  =30$ -  ответ -  /33 \n' +
                '  • Тростниковый сахар - 1 уп.  =50$ -  ответ -  /34 \n' +
                '\n' +
                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup: {keyboard: keyboard.films}
            })
            break

        case kb.home.exit:
            bot.sendMessage(chatId, 'До скорой встречи!\n' +
                'ВСЕМ МИР!')
            break



        case kb.popolnenie:
            bot.sendMessage(helper.getChatId(msg), 'Пополнение счета  \n' +
                ' \n' +

                'Bitcoin  \n' +
                ' \n' +
                ' EasyPay\n' +
                ' \n' +

                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup: { keyboard: keyboard.pay_popolnenie}
            })

    break




        case kb.home.site:
            bot.sendMessage(chatId, 'НАШ САЙТ:\n' +
                'https://brutal-amster-bot.pro\n' +
                'На сайте всегда актуальная версия бота!\n' +
                'Добавляем сайт себе в закладки, что бы всегда пользоваться актуальным ботом')

            break


        case kb.home.favourite:
            bot.sendMessage(chatId, 'Выберете товар:\n' +
                '\n' +
                ' \n' +
                '   • Ёлка - 1 шт.  =13$ -  ответ -  /1 \n' +
                ' \n' +
                '   • Витамин А - 1 шт.  =14$ -  ответ -  /2 \n' +
                ' \n' +
                ' • Сосна- 2 шт.  =15$ -  ответ -  /3 \n' + '\n' +
                '  • Тростниковый сахар - 0.5 уп  =30$ -  ответ -  /4 \n' +
                '  • Тростниковый сахар - 1 уп.  =50$ -  ответ -  /5 \n' +
                '\n' +
                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup: {keyboard: keyboard.films}
            })
            break




        case kb.home.cinemas:
            bot.sendMessage(chatId, 'На Вашем счете = 0$ \n' + '\n' +

                         'Пополнить счет - /popolnenie \n' +'\n' +
                            '\n' +
                              'Служба поддержки: @brutal_amster_support  \n' +
                                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.cinemas}

            })
            break




        case kb.film.elka:
            bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


                '   • Ёлка - 1 шт.  \n' +
                ' \n' +
                ' Ветряные горы\n' +
                ' \n' +
                ' Виноградар \n' +
                '\n' +
                '  Львовская площадь\n' +
                     '\n' +
                 '  М. Черниговская \n' +

                '\n' +
                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_elka}

            })
            break


        case kb.film.vitamin:
            bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


            '   • Витамин А - 1 шт.  \n' +
            ' \n' +
            ' Ветряные горы \n' +
            ' \n' +
            ' Виноградар \n' +
            '\n' +
            '  Львовская площадь \n' +
'\n' +
            '  М. Черниговская \n' +
                '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_vitamin}

            })
            break


        case kb.film.sosna:
            bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


            '   • Сосна - 2 шт.  \n' +
            ' \n' +
            ' Ветряные горы\n' +
            ' \n' +
            ' Виноградар  \n' +
            '\n' +
            '  Львовская площадь\n' +
                '\n' +
            '  М. Черниговская \n' +
                '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_sosna}

            })
            break


        case kb.film.sahar:
            bot.sendMessage(chatId, 'Наличие по районам:  \n' +

                '\n' +
                '  1.КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ: \n' +
                ' • Тростниковый сахар - 0.5 уп  =30$' + '\n' +
                '  • Тростниковый сахар - 1 уп.  =50$  \n' +
                '\n'
                + '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_sahar}

            })
            break


        case kb.film.sahar2:
            bot.sendMessage(chatId, 'Наличие по районам:  \n' +

                '\n' +
                '  1.КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ: \n' +
                ' • Тростниковый сахар - 0.5 уп  =30$ ' + '\n' +
                '  • Тростниковый сахар - 1 уп.  =50$  \n' +
                '\n'
                + '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_sahar}

            })
            break





        ////////////ELKA/////////////
        case kb.raion_elka.gori_elka:
            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Ёлка - 1 шт. в районе  Ветряные горы \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00359 BTC) \n' +
                'EasyPay = (377 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_elka}

            })
            break

        case kb.raion_elka.vinograd_elka:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Ёлка - 1 шт. в районе  Виноградар \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00359 BTC\n' +
                'EasyPay = (377 грн) \n', {
                reply_markup:
                    {keyboard: keyboard.pay_elka}

            })
            break

        case kb.raion_elka.ploshad_elka:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Ёлка - 1 шт. в районе Львовская площадь   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00359 BTC) \n' +
                'EasyPay = (377 грн) \n', {
                reply_markup:
                    {keyboard: keyboard.pay_elka}

            })
            break

        case kb.raion_elka.chern_elka:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Ёлка - 1 шт. в районе М. Черниговская   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00359 BTC) \n' +
                'EasyPay = (377 грн) \n', {
                reply_markup:
                    {keyboard: keyboard.pay_elka}

            })
            break
        ////////////ELKA/////////////


        ////////////VITAMIN/////////////
        case kb.raion_vitamin.gori_vitamin:
            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Витамин - 1 шт. в районе  Ветряные горы \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00362 BTC) \n' +
                'EasyPay = (388 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_vitamin}

            })
            break

        case kb.raion_vitamin.vinograd_vitamin:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Витамин - 1 шт. в районе  Виноградар \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00362 BTC) \n' +
                'EasyPay = (388 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_vitamin}

            })
            break

        case kb.raion_vitamin.ploshad_vitamin:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Витамин - 1 шт. в районе Львовская площадь   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00362 BTC) \n' +
                'EasyPay = (388 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_vitamin}

            })
            break

        case kb.raion_vitamin.chern_vitamin:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Витамин - 1 шт. в районе М. Черниговская   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00362 BTC)  \n' +
                'EasyPay = (388 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_vitamin}

            })
            break
        ////////////VITAMIN/////////////




        ////////////SOSNA/////////////
        case kb.raion_sosna.gori_sosna:
            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Сосна - 2 шт. в районе  Ветряные горы \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00415 BTC)  \n' +
                'EasyPay = (435 грн) \n', {
                reply_markup:
                    {keyboard: keyboard.pay_sosna}

            })
            break

        case kb.raion_sosna.vinograd_sosna:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Сосна - 2 шт. в районе  Виноградар \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00415 BTC) \n' +
                'EasyPay = (435 грн) \n', {
                reply_markup:
                    {keyboard: keyboard.pay_sosna}

            })
            break

        case kb.raion_sosna.ploshad_sosna:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Сосна - 2 шт. в районе Львовская площадь   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00415 BTC) \n' +
                'EasyPay = (435 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_sosna}

            })
            break

        case kb.raion_sosna.chern_sosna:

            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Сосна - 2 шт. в районе М. Черниговская   \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.00415 BTC)  \n' +
                'EasyPay = (435 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_sosna}

            })
            break
        ////////////SOSNA/////////////




        ////////////SAHAR0.5/////////////
        case kb.raion_sahar.saharok:
        bot.sendMessage(chatId, 'Вы выбрали:    \n' +


            '    • Тростниковый сахар - 0.5 уп. (КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ) = 30$ \n' +
            ' Выберете способ оплаты:' + '\n' + '\n' +


            'Bitcoin = (0.00829 BTC) \n' +
            'EasyPay = (870 грн) \n', {
            reply_markup:
                {keyboard: keyboard.pay_sahar}

        })
        break


        case kb.raion_sahar.saharok1:
            bot.sendMessage(chatId, 'Вы выбрали:    \n' +


                '    • Тростниковый сахар - 1 уп. (КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ) = 50$ \n' +
                ' Выберете способ оплаты:' + '\n' + '\n' +


                'Bitcoin = (0.01 BTC)  \n' +
                'EasyPay = (1385 грн)  \n', {
                reply_markup:
                    {keyboard: keyboard.pay_sahar1}

            })
            break
        ////////////SAHAR1/////////////



        case kb.pay_elka.easy_elka:
            bot.sendMessage(chatId, 'Заказ №1600\n    \n' +


                ' Вам зарезервировано - \n '+
                '  Ёлка - 1 шт.\n'+
                'Стоимостью - 13$\n'+
                'Итого к оплате - 377 грн\n' + '\n' +

                ' Оплатите на EasyPay кошелек:\n '+
                ' 58219550\n'+
                'Сумму - 377грн \n'+
                'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
                '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
                '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
                'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break

        case kb.pay_elka.btc_elka:
            bot.sendMessage(chatId, 'Заказ №1601\n    \n' +


                ' Вам зарезервировано - \n '+
                '  Ёлка - 1 шт.\n'+
                'Стоимостью - 13$\n'+
                'Итого к оплате - 0.00359 BTC\n' + '\n' +

                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - 0.00359 BTC\n' +  '\n' +
            'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break



        case kb.pay_vitamin.easy_vitamin:
            bot.sendMessage(chatId, 'Заказ №1602\n    \n' +


                ' Вам зарезервировано - \n '+
                '  Витамин А - 1 шт.\n'+
                'Стоимостью - 14$\n'+
                'Итого к оплате - 388 грн\n' + '\n' +

                ' Оплатите на EasyPay кошелек:\n '+
                ' 58219550\n'+
                'Сумму - 377грн \n'+
                'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
                '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
                '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
                'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break

        case kb.pay_vitamin.btc_vitamin:
            bot.sendMessage(chatId, 'Заказ №1603\n    \n' +


                ' Вам зарезервировано - \n '+
                ' Витамин А - 1 шт.\n'+
                'Стоимостью - 14$\n'+
                'Итого к оплате - 0.00362 BTC\n' + '\n' +

                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - 0.00362 BTC\n' +  '\n' +
                'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break



        case kb.pay_sosna.easy_sosna:
            bot.sendMessage(chatId, 'Заказ №1604\n    \n' +


                ' Вам зарезервировано - \n '+
                ' • Сосна - 2 шт.\n'+
                'Стоимостью - 15$\n'+
                'Итого к оплате - 435 грн\n' + '\n' +

                ' Оплатите на EasyPay кошелек:\n '+
                ' 58219550\n'+
                'Сумму - 435 грн \n'+
                'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
                '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
                '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
                'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break

        case kb.pay_sosna.btc_sosna:
            bot.sendMessage(chatId, 'Заказ №1605\n    \n' +


                ' Вам зарезервировано - \n '+
                ' • Сосна - 2 шт.\n'+
                'Стоимостью - 15$\n'+
                'Итого к оплате - 0.00415 BTC\n' + '\n' +

                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - 0.00415 BTC\n' +  '\n' +
                'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break



        case kb.pay_sahar.easy_sahar:
            bot.sendMessage(chatId, 'Заказ №1606\n    \n' +


                ' Вам зарезервировано - \n '+
                ' Тростниковый сахар - 0.5 уп. \n'+
                'Стоимостью - 30$\n'+
                'Итого к оплате - 870 грн\n' + '\n' +

                ' Оплатите на EasyPay кошелек:\n '+
                ' 58219550\n'+
                'Сумму - 870 грн \n'+
                'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
                '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
                '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
                'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break

        case kb.pay_sahar.btc_sahar:
            bot.sendMessage(chatId, 'Заказ №1606\n    \n' +


                ' Вам зарезервировано - \n '+
                ' Тростниковый сахар - 0.5 уп. \n'+
                'Стоимостью - 30$\n'+
                'Итого к оплате - 0.00829 BTC\n' + '\n' +

                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - 0.00829 BTC\n' +  '\n' +
                'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break


        case kb.pay_sahar1.easy_sahar1:
            bot.sendMessage(chatId, 'Заказ №1607\n    \n' +


                ' Вам зарезервировано - \n '+
                'Тростниковый сахар - 1 уп. \n'+
                'Стоимостью - 50$\n'+
                'Итого к оплате - 1385 грн\n' + '\n' +

                ' Оплатите на EasyPay кошелек:\n '+
                ' 58219550\n'+
                'Сумму - 1385 грн \n'+
                'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
                '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
                '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
                'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break

        case kb.pay_sahar1.btc_sahar1:
            bot.sendMessage(chatId, 'Заказ №1608\n    \n' +


                ' Вам зарезервировано - \n '+
                ' Тростниковый сахар - 1 уп. \n'+
                'Стоимостью - 30$\n'+
                'Итого к оплате - 0.01 BTC\n' + '\n' +

                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - 0.01 BTC\n' +  '\n' +
                'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break




        case kb.pay_popolnenie.easy_popolnenie:
            bot.sendMessage(chatId, 'Заказ №1300\n    \n' +



            ' Оплатите на EasyPay кошелек:\n '+
            ' 58219550\n'+
            'Сумму - любую в грн \n'+
            'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n'+
            '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите номер зказа\n' +
            '\n' + 'Резерв длится 30мин. В течении этого времени оплатите заказ.\n' +
            'ВНИМАНИЕ!!!\n' + 'СПАМИТЬ ЗАПРЕЩЕННО!!!',{

            reply_markup:
                {keyboard: keyboard.otmena
                }
        })
            break


        case kb.pay_popolnenie.btc_popolnenie:
            bot.sendMessage(chatId, 'Заказ №1501\n    \n' +



                '   Резерв длится 30мин.\n '+
                ' Внимание!!!\n'+
                'Оплата производится ОДНИМ платежом и частями не принимается!\n'+ '\n' +

                'Оплатите на Bitcoin адрес:  \n'+
                '1JxWnFQHkcG4pkXov3W3nxPVp6uN4eWNfW\n' +
                'Сумму - любую сумму в BTC\n' +  '\n' +
                'Купить Bitcoin можно на www.bestchange.ru\n' + '\n'+  'ОБЯЗАТЕЛЬНО после оплаты - пришлите оператору \n '

                + '@brutal_amster_support чек(скрин) с точным временем оплаты и укажите свой никнейм' ,{


                reply_markup:
                    {keyboard: keyboard.otmena
                    }
            })
            break





        case kb.home.home:
            bot.sendMessage(chatId, 'Что бы заказать товар -  нажмите кнопку "Выбрать товар"\n' + '\n' +
                'Что бы заказать товар с прайса -  нажмите кнопку "ПРАЙС"\n' +  '\n' +
                'Личный кабинет - /kabinet\n' +
                'Наш сайт - https://brutal-amster-bot.pro', {
                reply_markup: {keyboard: keyboard.home}
            })
            break



        ///////////////////////////BACK
        case kb.back:
            bot.sendMessage(chatId, 'Что бы заказать товар -  нажмите кнопку "Выбрать товар"\n' + '\n' +
                 'Что бы заказать товар с прайса -  нажмите кнопку "ПРАЙС"\n' + '\n' +
                'Личный кабинет - /kabinet\n' +
                'Наш сайт - https://brutal-amster-bot.pro', {
                reply_markup: {keyboard: keyboard.home}
            })
            break

        case kb.back_elka:
        bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


            '   • Ёлка - 1 шт.  \n' +
            ' \n' +
            ' Ветряные горы\n' +
            ' \n' +
            ' Виноградар \n' +
            '\n' +
            '  Львовская площадь \n' +
                '\n' +
            '  М. Черниговская\n' +
            '\n' +

            'Сделайте выбор и введите соответствующий номер\n' +
            'Служба поддержки: @brutal_amster_support \n' +
            'Наш сайт: https://brutal-amster-bot.pro', {
            reply_markup:
                {keyboard: keyboard.raion_elka}
        })
        break

        case kb.back_vitamin:
            bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


                '   • Витамин А - 1 шт.  \n' +
                ' \n' +
                ' Ветряные горы\n' +
                ' \n' +
                ' Виноградар \n' +
                '\n' +
                '  Львовская площадь\n' +
                '\n' +
                '  М. Черниговская\n' +
                '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_vitamin}
            })
            break

        case kb.back_sosna:
            bot.sendMessage(chatId, 'Выберете район, в котором доступен  \n' +


                '   • Сосна - 2 шт.  \n' +
                ' \n' +
                ' Ветряные горы\n' +
                ' \n' +
                ' Виноградар \n' +
                '\n' +
                '  Львовская площадь \n' +
                '\n' +
                '  М. Черниговская\n' +
                '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_sosna}
            })
            break

        case kb.back_sahar:
            bot.sendMessage(chatId, 'Наличие по районам:  \n' +

                '\n' +
                '  1.КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ: \n' +
                ' • Тростниковый сахар - 0.5 уп  =30$' + '\n' +
                '  • Тростниковый сахар - 1 уп.  =50$  \n' +
                '\n'
                + '\n' +

                'Сделайте выбор и введите соответствующий номер\n' +
                'Служба поддержки: @brutal_amster_support \n' +
                'Наш сайт: https://brutal-amster-bot.pro', {
                reply_markup:
                    {keyboard: keyboard.raion_sahar}

            })
            break


        case kb.otmena:
            bot.sendMessage(chatId, 'Заказ отменен.\n' +
                'Запрещено резервировать товар без оплаты более трех раз\n' +
                'ВТОРОЕ И ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ  \n', {
            reply_markup:
                {keyboard: keyboard.home}

        })
            break



    }


    if(msg.location) {
        getCinemasInCoord(chatId, msg.location)
    }
})

bot.onText(/\/start/, msg =>{

    const text = 'Здравствуйте, ' + msg.from.first_name + ', нам с Вами по дороге!'

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })
})






bot.onText(/\/popolnenie/, msg =>{


    bot.sendMessage(helper.getChatId(msg), 'Пополнение счета  \n' +
        ' \n' +

    'Bitcoin  \n' +
        ' \n' +
        ' EasyPay\n' +
        ' \n' +

        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup: { keyboard: keyboard.pay_popolnenie}
    })
})


bot.onText(/\kabinet/, msg => {
    bot.sendMessage(helper.getChatId(msg), 'На Вашем счете = 0$ \n' + '\n' +

        'Пополнить счет - /popolnenie \n' +'\n' +
        '\n' +
        'Служба поддержки: @brutal_amster_support  \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.cinemas}

    })
})




bot.onText(/\/1/, msg =>{


    bot.sendMessage(helper.getChatId(msg), 'Выберете район, в котором доступен  \n' +


        '   • Ёлка - 1 шт.  \n' +
        ' \n' +
        ' Ветряные горы\n' +
        ' \n' +
        ' Виноградар \n' +
        '\n' +
        '  Львовская площадь \n' +

        '  М. Черниговская\n' +

        '\n' +
        'Сделайте выбор и введите соответствующий номер\n' +
        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.raion_elka}

    })
})

bot.onText(/\/2/, msg =>{


    bot.sendMessage(helper.getChatId(msg), 'Выберете район, в котором доступен  \n' +


        '   • Витамин А - 1 шт.  \n' +
        ' \n' +
        ' Ветряные горы \n' +
        ' \n' +
        ' Виноградар  \n' +
        '\n' +
        '  Львовская площадь \n' +

        '  М. Черниговская \n' +
        '\n' +

        'Сделайте выбор и введите соответствующий номер\n' +
        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.raion_vitamin}

    })
})

bot.onText(/\/3/, msg =>{


    bot.sendMessage(helper.getChatId(msg),'Выберете район, в котором доступен  \n' +


        '   • Сосна - 2 шт.  \n' +
        ' \n' +
        ' Ветряные горы \n' +
        ' \n' +
        ' Виноградар \n' +
        '\n' +
        '  Львовская площадь \n' +

        '  М. Черниговская\n' +
        '\n' +

        'Сделайте выбор и введите соответствующий номер\n' +
        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.raion_sosna}

    })
})

bot.onText(/\/4/, msg =>{


    bot.sendMessage(helper.getChatId(msg), 'Наличие по районам:  \n' +

        '\n' +
        '  1.КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ: \n' +
        ' • Тростниковый сахар - 0.5 уп  =30$' + '\n' +
        '  • Тростниковый сахар - 1 уп.  =50$  \n' +
        '\n'
        + '\n' +

        'Сделайте выбор и введите соответствующий номер\n' +
        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.raion_sahar}

    })
})

bot.onText(/\/5/, msg =>{


    bot.sendMessage(helper.getChatId(msg), 'Наличие по районам:  \n' +

        '\n' +
        '  1.КЛАД В ТЕЧЕНИИ 6-ти ЧАСОВ ПОСЛЕ ОПЛАТЫ: \n' +
        ' • Тростниковый сахар - 0.5 уп  =30$ ' + '\n' +
        '  • Тростниковый сахар - 1 уп.  =50$  \n' +
        '\n'
        + '\n' +

        'Сделайте выбор и введите соответствующий номер\n' +
        'Служба поддержки: @brutal_amster_support \n' +
        'Наш сайт: https://brutal-amster-bot.pro', {
        reply_markup:
            {keyboard: keyboard.raion_sahar}

    })
})














bot.onText(/\/f(.+)/, (msg , [source, match]) => {

    const filmUuid = helper.getItemUuid(source)
    const chatId = helper.getChatId(msg)
    console.log(filmUuid)

    Film.findOne({uuid: filmUuid}) .then(film => {

        const caption = `Название: ${film.name}\nГод: ${film.year}\nРейтинг: ${film.rate}\nДлина: ${film.length}\nСтрана: ${film.country}\\n`

        bot.sendPhoto(chatId, film.picture, {
            caption: caption,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Добавить в избранное',
                            callback_data: film.uuid
                        },
                        {
                            text: 'Показать кинотеатры',
                            callback_data: film.uuid
                        }

                ],
                [
                    {
                        text: `Кинопоиск ${film.name}`,
                        url: film.link

                    }
                    ]
                    ]
            }
        })


    })

})

bot.onText(/\/c(.+)/, (msg, [source, match]) => {
    const cinemaUuid = helper.getItemUuid(source)
    const chatId = helper.getChatId(msg)

    Cinema.findOne({uuid: cinemaUuid}). then(cinema => {

        bot.sendMessage(chatId, `Кинотеатр ${cinema.name}`, {
            reply_markup:{
                inline_keyboard: [
                    [
                        {
                            text: cinema.name,
                            url: cinema.url
                        },
                        {
                            text: 'Показать на карте',
                            callback_data: JSON.stringify(cinema.uuid)
                        }
                    ],
                    [
                        {
                            text: 'Показать фильмы',
                            callback_data:  JSON.stringify(cinema.films)
                        }
                    ]
                ]
            }
        } )
    })
})


// ================================

function sendFilmsByQuery(chatId, query) {
    Film.find(query).then(films => {
        console.log(films)

        const html = films.map((f, i) => {
            return `<b> ${i + 1} </b> ${f.name} - /f${f.uuid}`
        }).join('\n')

        sendHTML(chatId, html, 'films')
    })
}



function sendHTML(chatId, html, kbName = null)  {
    const options = {
        parse_mode: 'HTML'
    }

    if(kbName) {
        options['reply_markup'] = {

            keyboard: keyboard[kbName]
        }
    }
    bot.sendMessage(chatId, html, options)
}

