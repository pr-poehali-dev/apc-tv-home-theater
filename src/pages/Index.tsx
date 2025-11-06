import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  duration: string;
  thumbnail: string;
  featured?: boolean;
}

const mockMovies: Movie[] = [
  { id: 1, title: 'Величайший Побег', year: 2024, rating: 8.9, genre: 'Боевик', duration: '2ч 15м', thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500', featured: true },
  { id: 2, title: 'Тайны Ночного Города', year: 2024, rating: 8.7, genre: 'Триллер', duration: '1ч 58м', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500', featured: true },
  { id: 3, title: 'Звёздный Путь', year: 2023, rating: 9.1, genre: 'Фантастика', duration: '2ч 42м', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500' },
  { id: 4, title: 'Последний Рубеж', year: 2024, rating: 8.5, genre: 'Драма', duration: '2ч 8м', thumbnail: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=500' },
  { id: 5, title: 'Вечная Любовь', year: 2023, rating: 8.3, genre: 'Мелодрама', duration: '1ч 52м', thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500' },
  { id: 6, title: 'Код Возмездия', year: 2024, rating: 8.8, genre: 'Боевик', duration: '2ч 5м', thumbnail: 'https://images.unsplash.com/photo-1574267432644-f610fa7a4896?w=500' },
];

const mockSeries: Movie[] = [
  { id: 7, title: 'Империя Теней', year: 2024, rating: 9.3, genre: 'Драма', duration: '8 сезонов', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500' },
  { id: 8, title: 'Квантовый Скачок', year: 2023, rating: 8.9, genre: 'Фантастика', duration: '3 сезона', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500' },
  { id: 9, title: 'Детективы Прошлого', year: 2024, rating: 8.6, genre: 'Детектив', duration: '5 сезонов', thumbnail: 'https://images.unsplash.com/photo-1509647648216-7c1f3add9a1d?w=500' },
];

const collections = [
  { id: 1, name: 'Топ недели', icon: 'TrendingUp', count: 24 },
  { id: 2, name: 'Премьеры 2024', icon: 'Sparkles', count: 18 },
  { id: 3, name: 'Классика', icon: 'Award', count: 156 },
  { id: 4, name: 'Для всей семьи', icon: 'Users', count: 42 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('Главная');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const navItems = [
    { name: 'Главная', icon: 'Home' },
    { name: 'Фильмы', icon: 'Film' },
    { name: 'Сериалы', icon: 'Tv' },
    { name: 'Подборки', icon: 'Library' },
    { name: 'Поиск', icon: 'Search' },
    { name: 'Избранное', icon: 'Heart' },
    { name: 'История', icon: 'Clock' },
    { name: 'Настройки', icon: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground">
      <div className="flex h-screen">
        <aside className="w-72 border-r border-border bg-[#0D0D0D] flex flex-col">
          <div className="p-6 border-b border-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8B0000] rounded-lg flex items-center justify-center shadow-gold">
                <Icon name="Clapperboard" size={28} className="text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gold tracking-wide">ПРЕМИУМ</h1>
                <p className="text-xs text-muted-foreground">Домашний кинотеатр</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === item.name
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#8B0000]/10 text-gold border border-gold/30 shadow-gold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Гость</p>
                <p className="text-xs text-muted-foreground">Premium аккаунт</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-8">
              {activeTab === 'Главная' && (
                <>
                  <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200"
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12">
                      <Badge className="mb-4 bg-gold text-black font-bold">
                        <Icon name="Sparkles" size={14} className="mr-1" />
                        Премьера недели
                      </Badge>
                      <h2 className="text-6xl font-bold mb-4 text-gold tracking-tight">Величайший Побег</h2>
                      <div className="flex items-center gap-6 mb-6 text-accent">
                        <div className="flex items-center gap-2">
                          <Icon name="Star" size={20} className="text-gold fill-gold" />
                          <span className="text-xl font-semibold text-gold">8.9</span>
                        </div>
                        <span className="text-lg">2024</span>
                        <span className="text-lg">2ч 15м</span>
                        <Badge variant="outline" className="border-accent text-accent">Боевик</Badge>
                      </div>
                      <p className="text-lg text-accent/90 max-w-2xl mb-8 leading-relaxed">
                        Захватывающая история о невероятном побеге из секретной тюрьмы, где каждая минута на счету.
                      </p>
                      <div className="flex gap-4">
                        <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-8 shadow-gold hover-glow">
                          <Icon name="Play" size={20} className="mr-2" />
                          Смотреть сейчас
                        </Button>
                        <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 font-semibold px-8">
                          <Icon name="Plus" size={20} className="mr-2" />
                          В избранное
                        </Button>
                      </div>
                    </div>
                  </div>

                  <section className="mb-12">
                    <h3 className="text-3xl font-bold mb-6 text-gold">Подборки</h3>
                    <div className="grid grid-cols-4 gap-6">
                      {collections.map((collection) => (
                        <div
                          key={collection.id}
                          className="bg-gradient-to-br from-card to-muted border border-border rounded-xl p-6 hover-glow cursor-pointer transition-all"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#8B0000] rounded-lg flex items-center justify-center mb-4 shadow-gold">
                            <Icon name={collection.icon as any} size={28} className="text-black" />
                          </div>
                          <h4 className="text-xl font-bold mb-2">{collection.name}</h4>
                          <p className="text-muted-foreground">{collection.count} фильмов</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-bold text-gold">Популярные фильмы</h3>
                      <Button variant="ghost" className="text-accent hover:text-gold">
                        Все фильмы
                        <Icon name="ChevronRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-6">
                      {mockMovies.map((movie) => (
                        <div
                          key={movie.id}
                          onClick={() => setSelectedMovie(movie)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg hover-glow transition-all">
                            <img
                              src={movie.thumbnail}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-3 right-3 bg-black/80 px-2 py-1 rounded-lg flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-gold fill-gold" />
                              <span className="text-sm font-bold text-gold">{movie.rating}</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-gold">
                                <Icon name="Play" size={32} className="text-black ml-1" />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-semibold mb-1 group-hover:text-gold transition-colors">{movie.title}</h4>
                          <p className="text-sm text-muted-foreground">{movie.year} • {movie.genre}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-bold text-gold">Популярные сериалы</h3>
                      <Button variant="ghost" className="text-accent hover:text-gold">
                        Все сериалы
                        <Icon name="ChevronRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-6">
                      {mockSeries.map((series) => (
                        <div
                          key={series.id}
                          onClick={() => setSelectedMovie(series)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg hover-glow transition-all">
                            <img
                              src={series.thumbnail}
                              alt={series.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-3 right-3 bg-black/80 px-2 py-1 rounded-lg flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-gold fill-gold" />
                              <span className="text-sm font-bold text-gold">{series.rating}</span>
                            </div>
                            <Badge className="absolute top-3 left-3 bg-secondary border-secondary">
                              Сериал
                            </Badge>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-gold">
                                <Icon name="Play" size={32} className="text-black ml-1" />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-semibold mb-1 group-hover:text-gold transition-colors">{series.title}</h4>
                          <p className="text-sm text-muted-foreground">{series.year} • {series.duration}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'Поиск' && (
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-gold">Поиск</h2>
                  <div className="max-w-3xl mb-8">
                    <div className="relative">
                      <Icon name="Search" size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Найти фильм, сериал или актёра..."
                        className="pl-14 h-16 text-lg bg-card border-border focus:border-gold rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground py-20">
                    <Icon name="Film" size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Введите запрос для поиска</p>
                  </div>
                </div>
              )}

              {activeTab === 'Настройки' && (
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-gold">Настройки</h2>
                  <div className="max-w-2xl space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Качество видео</h3>
                      <div className="space-y-3">
                        {['Авто', '4K Ultra HD', '1080p Full HD', '720p HD'].map((quality) => (
                          <label key={quality} className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" name="quality" className="w-5 h-5 accent-gold" defaultChecked={quality === 'Авто'} />
                            <span className="text-lg">{quality}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Источники контента</h3>
                      <div className="space-y-3">
                        {['ZONA', 'Viewbox', 'Lampa'].map((source) => (
                          <label key={source} className="flex items-center justify-between cursor-pointer">
                            <span className="text-lg">{source}</span>
                            <input type="checkbox" className="w-5 h-5 accent-gold" defaultChecked />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
