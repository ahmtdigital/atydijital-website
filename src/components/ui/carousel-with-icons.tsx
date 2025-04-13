
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import MarketingIcon from "./marketing-icon"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  iconMode?: boolean
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  iconMode?: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      iconMode = false,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          iconMode,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation, iconMode } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? iconMode ? "gap-8 px-4" : "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, iconMode } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        iconMode ? "min-w-fit shrink-0" : "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? iconMode ? "" : "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full transition-all duration-300",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Önceki slayt</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full transition-all duration-300",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Sonraki slayt</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselIconItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean, icon?: string }
>(({ className, active = false, icon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300",
        active 
          ? 'bg-ignite/10 text-ignite scale-105' 
          : 'bg-dark-400 text-gray-400 hover:bg-dark-300',
        className
      )}
      {...props}
    >
      {icon ? (
        <MarketingIcon name={icon} className="h-10 w-10" />
      ) : (
        props.children
      )}
    </div>
  )
})
CarouselIconItem.displayName = "CarouselIconItem"

const MarketingIconCarousel = ({ icons }: { icons: string[] }) => {
  const [activeIcon, setActiveIcon] = React.useState(0);

  const handleIconClick = (index: number) => {
    setActiveIcon(index);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {icons.map((icon, index) => (
          <div key={index} className="relative">
            <CarouselIconItem 
              icon={icon}
              active={activeIcon === index}
              onClick={() => handleIconClick(index)}
              className="hover:scale-105 transition-all cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="bg-dark-500 p-6 rounded-lg border border-dark-400">
        <h3 className="text-xl font-bold mb-2">
          {icons[activeIcon] === 'google-analytics' && 'Google Analytics'}
          {icons[activeIcon] === 'meta-ads' && 'Meta Reklam Platformu'}
          {icons[activeIcon] === 'tiktok-ads' && 'TikTok Ads'}
          {icons[activeIcon] === 'google-ads' && 'Google Reklamları'}
          {icons[activeIcon] === 'linkedin-ads' && 'LinkedIn Reklamları'}
          {icons[activeIcon] === 'twitter-ads' && 'X (Twitter) Reklamları'}
          {icons[activeIcon] === 'youtube-ads' && 'YouTube Reklamları'}
          {icons[activeIcon] === 'instagram-ads' && 'Instagram Reklamları'}
        </h3>
        <p className="text-gray-400">
          {icons[activeIcon] === 'google-analytics' && 'Web sitenizin performansını analiz edin, kullanıcı davranışlarını anlayın ve veri odaklı kararlar verin.'}
          {icons[activeIcon] === 'meta-ads' && 'Facebook ve Instagram platformlarında hedef kitlenize ulaşın ve satışlarınızı artırın.'}
          {icons[activeIcon] === 'tiktok-ads' && 'GenZ kitlesine ulaşmanın en etkili yolu. Yaratıcı içeriklerle markanızı tanıtın.'}
          {icons[activeIcon] === 'google-ads' && 'Arama ağında ve görüntülü reklamlarda markanızı öne çıkarın, dönüşüm oranlarınızı artırın.'}
          {icons[activeIcon] === 'linkedin-ads' && 'B2B pazarda profesyonellere ulaşın, potansiyel müşterilerinizi hedefleyin.'}
          {icons[activeIcon] === 'twitter-ads' && 'X platformunda gündem konuları ile ilgili reklam kampanyaları oluşturun.'}
          {icons[activeIcon] === 'youtube-ads' && 'Dünyanın en büyük video platformunda markanızı tanıtın ve izleyicilerle etkileşime geçin.'}
          {icons[activeIcon] === 'instagram-ads' && 'Görsel odaklı içeriklerle Instagram kullanıcılarına ulaşın ve etkileşim yaratın.'}
        </p>
      </div>
    </div>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIconItem,
  MarketingIconCarousel
}
