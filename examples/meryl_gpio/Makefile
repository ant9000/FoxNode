DIRNAME=$(shell basename `pwd`)
.phony: all deps tgz

all:
	@echo "Usage:"
	@echo ""
	@echo " make deps"
	@echo "   installs dependencies using npm"
	@echo ""
	@echo " make tgz"
	@echo "   creates a .tgz archive with the application contents"
	@echo ""

deps:
	@(npm help bundle >/dev/null 2>&1) && npm bundle || npm install

tgz:
	tar zcvf $(DIRNAME).tgz \
		-C.. \
		--exclude $(DIRNAME)/node_modules \
		--exclude $(DIRNAME)/$(DIRNAME).tgz \
		$(DIRNAME)
